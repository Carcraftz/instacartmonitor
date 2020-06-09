# instacartmonitor
Monitors Instacart and notifies you via a Discord Webhook if Delivery is avaliable

I made this because back in march, instacart delivieries were impossible to get due to Covid, especially for the immunocompromised. I originally shared the link to a discord server with the webhooks for various stores with my community and it was used in order to place orders. Luckily, this no longer became needed as Instacart has hired many more workers to handle the demand. I'm releasing the code now. It's extremely simple. In order to run it, all you need to do is find a host (could be your personal computer or you can use glitch.com). Download the project and edit the .env file as following:<br/>

To obtain the cookie, go to instacart.com, log in, ctrl/cmd shift I to open developer console, then go to console, run console.log(document.cookie) and enter the value returned into the .env file after cookie=<br /> 

To obtain the webhook, go to discord, log in and create a guild. Create the channel you want messages to be posted in. Click edit channel, click webhooks, and then click Create Webhook. Copy the webhook URL and enter the value into the .env file after webhook=<br /> 

To obtain the store name you have to use the same name that's in the instacart URL for the store. For example, if the store url is https://www.instacart.com/store/acme-markets/storefront the store name would be acme-markets. For this store you would enter acme-markets into the .env file after store=
