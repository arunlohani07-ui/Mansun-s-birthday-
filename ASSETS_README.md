# Assets guide 🌹

Put files exactly here (names are case-sensitive, lowercase `.jpg`):

```
public/
  images/
    1.jpg … 10.jpg   → Mansun's photos (love-letter slideshow, beauty page, "My Beautiful Sanu" gallery)
    a.jpg … j.jpg    → Shared memories only ("Our Memories" scrapbook)
  music/
    birthday-song.mp3 → Ayush's song (optional)
```

- Missing images show a soft rose placeholder — nothing breaks.
- Missing music: the player shows "Song not added yet" and the site works normally.
- Music never autoplays; she taps the ♪ button (top-right) to play.
- Portrait photos (3:4) look best. Keep each under ~500 KB for fast phones.
- All text (letter, secret cake message, promises, final letter) is in `src/lib/content.ts`.
