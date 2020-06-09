const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.static("public"));
var request = require("request");

//needed for glitch.com to host our project for free :D You can remove this if you're hosting on a personal computer
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let storedata = [];
function scrape(store, storehook) {
  let found = false;
  for (let i = 0; i < storedata.length; i++) {
    if (storedata[i].store == store) {
      found = true;
    }
  }
  if (!found) {
    storedata.push({ store: store, previousavaliable: false });
  }
  let options = {
    method: "GET",
    url:
      "https://www.instacart.com/v3/containers/" +
      store +
      "/next_gen/retailer_information/content/info?source=web&source_type=undefined&source=web",
    headers: {
      authority: "www.instacart.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
      "content-type": "application/json",
      accept: "application/json",
      "x-client-identifier": "web",
      "x-requested-with": "XMLHttpRequest",
      "sec-fetch-dest": "empty",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      referer:
        "https://www.instacart.com/store/" + store + "/info?tab=delivery",
      "accept-language": "en-US,en;q=0.9",
      cookie:process.env.cookie
    }
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body.toString());
    if (
      response.body
        .toString()
        .toLowerCase()
        .includes("right now, all shoppers are busy") ||
      response.body
        .toString()
        .toLowerCase()
        .includes("covid")
    ) {
      console.log("not avaliable " + store);
      for (let i = 0; i < storedata.length; i++) {
        if (storedata[i].store == store && storedata[i].previousavaliable) {
          fetch(storehook, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: "Instacart Log Bot",
              content: `Delivery Window has closed. Please wait for it to open again later Store: ${store}`
            })
          });
          storedata[i].previousavaliable = false;
        }
      }
    } else {
      console.log("times avaliable :D");
      for (let i = 0; i < storedata.length; i++) {
        if (storedata[i].store == store) {
          if (!storedata[i].previousavaliable) {
            fetch(storehook, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: "Instacart Log Bot",
                content: `DELIVERY IS AVALIABLE :D Store: ${store}`
              })
            });
            storedata[i].previousavaliable = true;
          }
        }
      }
    }
  });
}
scrape(
  process.env.store,
  process.env.webhook
);

setInterval(check => {
  scrape(
    process.env.store,
    process.env.webhook
  );
}, 30000);
