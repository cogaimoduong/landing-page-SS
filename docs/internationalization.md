# English and Vietnamese content

The site uses `en` as the default language. Visitors can switch between `EN`
and `VI`; the choice is saved in the `devdes_locale` cookie for one year.

## MongoDB content shape

For new editorial content stored in MongoDB, store each translatable field as
an object instead of a single string:

```ts
{
  title: {
    en: "Thoughtful design, purposeful technology",
    vi: "Thiết kế có chiều sâu, công nghệ có mục đích",
  },
  description: {
    en: "Websites and apps that move businesses forward",
    vi: "Website và ứng dụng đưa doanh nghiệp tiến xa",
  },
}
```

`LocalizedText` and `localizeText()` in `lib/i18n.ts` resolve a value in this
order:

1. The visitor's selected language
2. English
3. Vietnamese

Legacy string fields are still supported and shown unchanged. This lets
existing documents remain online while translations are added gradually.

## Chat documents

Chat messages written by people remain plain strings. A conversation now has a
`locale: "en" | "vi"` field so system welcome and acknowledgement messages are
created in the right language. Older conversations without this field are read
as Vietnamese to preserve their existing system messages.

Optional cleanup for existing chat documents:

```js
db.chat_conversations.updateMany(
  { locale: { $exists: false } },
  { $set: { locale: "vi" } }
)
```
