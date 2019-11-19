# Troubleshooting

## 1.1 Indentation with pug and vscode

- [ ] FIXME: Invalid indentation, you can use tabs or spaces but not both

This issue seems to happen a lot with vscode users:

```shell
Error: .../populairy/week-4/views/popup.pug:5:1
    3| block content
    4|  h1 #{popups.length} Pop-up(s) listed and counting...
  > 5|   h2 Pop-up Details:
-------^
    6|  each popup in popups
    7|          li #{popup.title} performed by #{popup.host}
    8|          p Organizers:

Invalid indentation, you can use tabs or spaces but not both
```

It seems something is conflicting at the moment. Tried this out but it does not work at the moment:

```json
{
    "editor.tabSize": 4,
    "editor.detectIndentation": false
}
```
https://github.com/Microsoft/vscode/issues/15316

## 1.2 Can not overwrite model once compiled

- [ ] FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'

```javascript
// popup-service.js
const Popup = mongoose.model('Popup', popupSchema);
module.exports = Popup;

// current workaround:
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model('Popup', popupSchema);
```

## 1.3 Casting error on ObjectID

- [ ] FIXME: Popup validation failed: eventHost: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"

This happens when trying to seed new records (event, popup) that have a reference to the other model.

```js
// Event.js (Event Schema)
eventHost: {
  name: String,
  firstName: String,
  lastName: String,
},
```

```js
// Popup.js (Pop-up Schema)
eventHost: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Event',
  autopopulate: {
  maxDepth: 1,
},
},
```

```js
// seedAllModels.js: Seed events, popups, persons initially
eventHost: {
  name: 'Food Coop Berlin',
},
```

### Error output:
```
ERROR while seeding DB with persons Error [ValidationError]: Popup validation failed: eventHost: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"
    at ValidationError.inspect (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/error/validation.js:61:24)
    at formatValue (internal/util/inspect.js:563:31)
    at inspect (internal/util/inspect.js:221:10)
    at formatWithOptions (internal/util/inspect.js:1693:40)
    at Object.Console.<computed> (internal/console/constructor.js:272:10)
    at Object.log (internal/console/constructor.js:282:61)
    at seedPersons (/Users/thuyle/workspace/private/thuy/populairy/week-5/bin/07_seedAllModels.js:319:13)
    at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  errors: {
    eventHost: MongooseError [CastError]: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"
        at new CastError (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/error/cast.js:29:11)
        at model.$set (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:1195:9)
        at model._handleIndex (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:934:14)
        at model.$set (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:878:22)
        at model.Document (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:136:12)
        at model.Model (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/model.js:97:12)
        at new model (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/model.js:4425:15)
        at seedPersons (/Users/thuyle/workspace/private/thuy/populairy/week-5/bin/07_seedAllModels.js:111:24)
        at processTicksAndRejections (internal/process/task_queues.js:93:5) {
      message: `Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"`,
      name: 'CastError',
      stringValue: `"{ name: 'Mona Lisa Complot' }"`,
      kind: 'ObjectID',
      value: [Object],
      path: 'eventHost',
      reason: [MongooseError]
    }
  },
  _message: 'Popup validation failed',
  name: 'ValidationError'
  ```

