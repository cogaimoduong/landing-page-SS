# Chat media catalog

The checked-in catalog contains the 881 entries published by Google Noto Animated
Emoji at https://googlefonts.github.io/noto-emoji-animation/data/api.json.
Source gallery: https://googlefonts.github.io/noto-emoji-animation/.

Only metadata is bundled. Animated images load from Google's published
`https://fonts.gstatic.com/s/e/notoemoji/latest/{codepoint}/512.webp` and
`512.gif` URLs. The picker loads 24 entries at a time, with lazy image loading.
The same catalog also provides native Unicode stickers that work without image
downloads. GIF and animated sticker playback require access to Google's CDN;
failed downloads display the native emoji and an error label.

The GIF tab additionally includes nine curated reaction GIFs served by GIPHY.
Their URLs were checked when added; provider attribution is shown in the picker.

Reactions are stored alongside each message in the existing local demo storage.
Each demo participant (`user` or `admin`) can select one emoji per message,
change it, or click the same emoji again to remove it. The existing storage
events synchronize the chat and Inbox in tabs on the same origin. This does
not add a server or synchronization between devices.
