Chrome extension to propagate cookie for dev servers with proxy configuration
(i.e. [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html))
using to propagate access cookies

# How to use

1. Clone repo
2. Go to chrome menu -> More Tools -> Extensions
3. Check developer mode checkbox
4. Press "Load unpacked extension" button and select extension folder in finder
![extensions](https://cdn.rawgit.com/pavelvlasov/propagate-cookie-chrome-extension/master/assets/1.png)
5. Press `CMD+Shift+i` to open dev tools
6. Click 'Propagate Cookie' tab and adjust settings
![extensions](https://cdn.rawgit.com/pavelvlasov/propagate-cookie-chrome-extension/master/assets/2.png)
7. Go to target website and press cookie icon in the extensions menu to
send cookie to the server
![extensions](https://cdn.rawgit.com/pavelvlasov/propagate-cookie-chrome-extension/master/assets/3.png)

You should configure `/_dev-server/propagate-cookie` endpoint on your local dev server
to handle click action.

Example express endpoint:
```js
app.post('/_dev-server/propagate-cookie', (req, res) => {
  res.send('OK');

  // do smth with the cookie in req.body
  // ...
});
```

Extension sends request in the following format:
```json
{
  "host": "https://example.com",
  "domain": "example.com",
  "cookie": "<cookie name>=<cookie value>"
}
```

LICENSE: MIT
