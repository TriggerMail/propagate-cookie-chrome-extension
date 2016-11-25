Chrome extension to propagate cookie for dev servers
(i.e. [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html))

# How to use

1. Go to chrome menu -> More Tools -> Extensions
2. Check developer mode checkbox
3. Press CMD+Shift+i to open dev tools
4. Click 'Propagate Cookie' tab and adjust settings
5. Go to target website and press cookie icon in the extensions menu to
send cookie to the server

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
