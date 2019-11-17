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