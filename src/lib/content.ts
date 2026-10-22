// ✏️ All personal text lives here so Ayush can edit it easily.

export const OPENING = "Euta sano surprise xa timro lagi, mero budii… 🥹❤️";

/** Normalizes so both "2083-02-11" and "2083/02/11" unlock. */
export function checkPassword(input: string): boolean {
  const v = input.trim().replace(/\//g, "-");
  const parts = v.split("-");
  if (parts.length !== 3) return false;
  return parts[0] === String(2000 + 83) && parts[1] === "0" + 2 && parts[2] === String(11);
}

export const WELCOME = {
  title: "Happy Birthday, mero sanu 🎂❤️",
  line1: "Welcome to your little universe, made only for you.",
  line2:
    "Timi mero life ko sabai bhanda special manche hau, and this little world is made with all my love, just for you. 🥹🌹",
};

export const LETTER: string[][] = [
  [
    "Happy Birthday, mero sanu 🎂 aaja timro din ho.",
    "Timi aayepachi mero life ekdam sundar bhayo.",
    "Timi mero lagi kati important xau, sabda pugdaina.",
    "Ma timro saath kahile chhoddina, promise haii.",
    "Timi lai hurt garne gari kahile karaudina, gali gardina.",
  ],
  [
    "Jaani jaani timi lai dukha dina, kahile pani hoina.",
    "Timi sadhai khusi raha, mann shanta rahos hai.",
    "Timro sabai sapana pura hos, success timro hos.",
    "Thank you mero life ma aayera, mero budii ♡",
    "I am so lucky to have you, today and always.",
  ],
];
export const LETTER_SIGN = "Timro baccha ♡";

export const BEAUTY = [
  { t: "Timro smile", d: "Timi haasda na, mero sabai tension harauxa. Your smile feels like the first warm light of morning." },
  { t: "Timro aankha", d: "Timro aankha ma herda mann shanta hunxa — like looking at a calm sky full of soft stars." },
  { t: "Timro presence", d: "Timi bhayeko thau ma sabai kura halka ra sundar lagxa. You make ordinary days feel like a soft song." },
  { t: "Timi le dine khusi", d: "Mero life ko sabai bhanda thulo khusi timi nai hau, mero budii. Timro baccha ko sansar nai timi hau." },
];

export const GALLERY_COMPLIMENTS = [
  "Kati cute mero sanu 🥹",
  "That smile is my favourite place ♡",
  "Mero aankha ko taara ✨",
  "Too pretty for this world 🌹",
  "Timro baccha ko sabai bhanda mitho manche",
];

export const MEMORY_CAPTIONS = [
  "hamro sano khusi ♡",
  "yo moment ❤️",
  "always us",
  "mero favourite day",
  "timi ra ma 🌹",
  "keep this forever",
  "sano sano kura, thulo maya",
  "you + me",
  "my safe place",
  "more of this, always ♡",
];
export const MEMORIES_MESSAGE =
  "Hamro har memory mero lagi khajana jastai ho. Ups and downs aaun, hami sangai hasdai aghi badhaun — I want to keep making many more beautiful memories with you, mero budii.";

export const CAKE_SECRET =
  "Mero budii, timro baccha ley timi lai dherai maya garxa haiii. 😭❤️ Jati nai kura bhaye pani, timi mero lagi ekdam special xau. Never forget that, mero sanu. 🌹🫂";

export const PROMISE = [
  "Ma timi lai sadhai maya garxu, mero sanu.",
  "Ramro din ma pani, garo din ma pani — timro saath ma ubhinxu.",
  "Timi sanga sadhai pyaar le, respect le bolchu.",
  "Hamro yo relationship lai ma sadhai cherish garxu ♡",
];
export const PROMISE_SIGN = "Forever yours, Timro baccha ♡";

export const HUG = "Euta thulo virtual hug mero budii ko lagi 🫂❤️";

export const FINAL_LETTER = [
  "Mero sanu, timi sadhai khusi raha, timro mann ma sadhai shanti rahos.",
  "Timro har sapana pura hos, ra timi jati pani success deserve garxau, sabai paau.",
  "Timi mero life ma bhayeko ma ma sadhai grateful xu — thank you for being you.",
  "Hamro future sangai, haasdai, ekarka ko haat samatera banaun hai.",
];
export const FINAL_END_1 = "Happy Birthday, mero sanu, mero budii. 😭💋❤️";
export const FINAL_END_2 =
  "Timro baccha ley timi lai dherai maya garxa — aaja pani, bholi pani, ra harek din. ♡";
export const CREDIT = "Made with love by Mansun ko sanu ♡";

export const PERSONAL = Array.from({ length: 10 }, (_, i) => `/images/${i + 1}.jpg`);
export const MEMORIES = "abcdefghij".split("").map((c) => `/images/${c}.jpg`);
export const MUSIC_SRC = "/music/birthday-song.mp3";
