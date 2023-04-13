<script setup>
import { onMounted, ref } from "vue";
import { quotesDB } from "../../db/quotes";
import { getFirestore } from "firebase/firestore";
import { VtunifyStore } from "../../store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// import {  } from "firebase/firestore"
import { db } from "../../main";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const store = VtunifyStore();
const colorRef = ref("");
const inputKey = ref("");
const randomQuotes = () => {
  const randomNum = Math.floor(Math.random() * quotesDB.length);
  return quotesDB[randomNum];
};
const bookNameRef = ref("");
const quote = randomQuotes();
const bookname = ref("");
const bookList = ref([
  {
    book: "Think and Grow Rich",
    color: "#f3f5b0",
    rotate: "rotate(0deg)",
    bookCover:
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fthink.jpg?alt=media",
    genre: "Self help",
    author: "Napoleon hill",
    startDate: new Date("2023-02-25").getTime(),
    endDate: new Date("2023-03-25").getTime(),
    ratings: 3,
    Thoughts: [
      "A quitter never wins - and - a winner never quits",
      "Dreams are not born of indifference, laziness, or lack of ambition.",
      "Both poverty and riches are the offspring of thought",
    ],
    learnings: `I think I learned a lot!
For one, I gained a lot of very motivating insights. The author gives the sense that we can achieve anything we set our mind to. Attracting wealth is a state of mind. This gives me confidence (faith) to achieve my monetary goals.
I learned how to concentrate on my desire and set better priorities. I know about the importance of persistence.`,
    notes: `most importantly, one needs a burning desire and a definite purpose, concentrate on them and train the unconscious to look for answers because wealth has its origin in ideas.
There are some things in the book I am not sure on, but the last point makes a lot of sense: The stronger the desire, the more energy I will put into it and the more motivation I will have. I need a definite plan or purpose to start acting, because if I don't act, I am only wishing. I also believe in the power of the unconscious, so getting it in alignment with my purpose seems very reasonable. That massive wealth can be created even with a single idea seems self-evident to me.
`,
  },
  {
    book: "Atomic Habits",
    color: "#eaf3f6",
    rotate: "rotate(-2deg)",
    genre: "Self help",
    bookCover:
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fatomichabit.jpg?alt=media",
    author: "Napolian hill",
    startDate: new Date("2023-03-05").getTime(),
    endDate: new Date("2023-04-10").getTime(),
    ratings: 4,
    Thoughts: [
      "You do not rise to the level of your goals. You fall to the level of your systems",
      "The best way of building a habit is making it part of your identity.",
      "Make it easy to start: Habits are the entry point - not the goal",
      "Make it hard to do the things you want to avoid.",
    ],
    learnings: `"Read 30 books" ⇒ "Read before bed every night" ⇒ "Read one page". Reduce a habit into a 2-minute first step.
- Stick to the plan: "Professionals stick to the schedule, amateurs let life get in the way." Don't be a "fair weather runner" if you want to run a lot.`,
    notes: `*Identity*
The three levels of change - the lower the more "fundamental":
3. Outcomes = Your goals
2. Processes = Your system
1. Identity = Who you perceive yourself to be

Make every action is a vote for what kind of person you want to become. Building habits is becoming the version of yourself you want to be. Habits help you to trust yourself.
- Realize that "You don't _have to_ do anything, you _get to_."
- Ask "What would a healthy person do?".
- Ask "What feel like fun to you, but is work to others?"


*Engineer it so that:*
Things you want to achieve vs Things you want to avoid
Obvious — Invisible
Attractive —Unattractive
Easy — Hard
Satisfying — Satisfying
For example: if you want to watch less TV - keep it unplugged - only plugin if you can say out loud the name of the show you want to watch.`,
  },
  {
    book: "deep work",
    color: "yellow",
    rotate: "rotate(-1deg)",
    bookCover:
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fsaurav-thapa-shrestha-lahLtM0Zy8k-unsplash.jpg?alt=media",
    startDate: new Date("2023-01-12").getTime(),
    endDate: new Date("2023-02-10").getTime(),
    genre: "Self help",
    author: "Cal newport",
    ratings: 4,
    Thoughts: [
      "I'll live the focused life, because it's the best life to live.",
      "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
      "Clarity about what matters provides clarity about what does not.",
      "Who you are, what you think, feel, and do, what you love—is the sum of what you focus on.",
    ],
    learnings: `- To learn quickly, you need to study for long periods of time consistently. This is neurologically proven.

- Force yourself to concentrate by locking away digital distractions. To write comprehensive thoughts, put away and limit distractions, interruptions, and constant checking of messages.

-Perform a 'shut down' complete action that signifies the end of your professional work day

-Regularly rest your mind to improve frequently and intensity of deep work (e.g. short walks, water breaks)`,
    notes: `- Deep work is a skill that can and must be developed to be successful in knowledge work. Leaders in the next generation will have the power to put away distraction and enter into deep work.

- Working creatively with machines is one of the three types of people who will success in the new economy. UX designers are right in line with this thinking. AN added benefit is being able to work remote and control your work environment.

- Knowledge work is not supposed to be shown through producing X amount of widgets. It shouldn't be solely measured by quantity of hours worked or public messages/deliverables sent. Quality is what really matters.

- When telling people that you're busy, they will respect it. Deep work stretches are always understood if they are well defined, and well communicated to those trying to get your attention.`,
  },
  {
    book: "Think Like a Monk",
    color: "#b1d0ed",
    rotate: "rotate(0deg)",
    bookCover:
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fmokth.png?alt=media",
    startDate: new Date("2023-03-12").getTime(),
    endDate: new Date("2023-04-10").getTime(),
    genre: "Self help",
    author: "Jay shetty",
    ratings: 4,
    Thoughts: [
      "It’s a mistake to think that when you read a book, attend a class and implement changes that it will fix everything. The externals will never be perfect, and the goal isn’t perfection. Life is not going to go your way. You have to go your way and take life with you",
      "Humility comes from accepting where you are without seeing it as a reflection of who you are.",
      "Meditation doesn’t eliminate distractions, it manages them",
      "Here’s a life hack: Service is always the answer. Service is the direct path to a meaningful life.",
    ],
    learnings: `Some changes I personally made inspired by this book:
(1) set tougher limits on social media use
(2) spend more time in silence
(3) practice paying attention to new aspects of my routine environment in more detail
(4) listen to kirtan music and added some mantra songs to my Spotify playlist
(5) I ask myself how I served today
(6) pay attention to the fine line between confidence and egoism
(7) remember that I can always serve (no need to wait to have "enough") - but of course, take care of myself too
There were probably more things :)`,
    notes: `Before judging others, pause for a moment and ask: am I finding fault in order to distract myself or others from my own insecurities? Am I projecting my own weakness onto them? And even if I’m doing neither of those things, am I any better than the person I’m criticizing?
I can’t say what the answers to the first two questions will be in every case, but the answer to the third question is always no.

Calm. Balance. Ease. Stillness. Peace.
Your breath responds to everything.

At any given moment you cannot change the past but you are contributing to the future so you might as well be fully present. Be where you physically are. Location has energy. Time (routine) has memory.

A monk is a traveler but the journey is inward
— it can take years to discover our dharma (pay attention to when you feel alive)
— many early achievers feel immense anxiety to maintain a level of performance (late bloomers are great!)
— every task everywhere is an essential organ
(there is no hierarchy of dharmas)

4 C’s of relationships
Care, character, competence, consistency
Am I a teacher, peer, or student?

Loneliness is the pain of being alone.
Solitude is the glory of being alone.

Mantra. Say it out loud.
1. Recognize ego
2. Acknowledge your value
3. Live in service
Service is the direct path to a meaningful life.

Perhaps the thing I gathered and loved the most about monk life is how they are forever students: observing, questioning, evaluating. Be a student! This information felt so RELEVANT for our lives of overstimulation, immediate reward, and the inevitable, pivotal, wondering about purpose and other existential things. If you can find your place among the uncertain, it’s a lot easier to move forward.`,
  },

  {
    book: "You are a badass",
    color: "#fdbbdd",
    rotate: "rotate(-2deg)",
    bookCover:
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fbadass.jpg?alt=media",
    startDate: new Date("2023-04-01").getTime(),
    endDate: new Date("2023-04-14").getTime(),
    genre: "Self help",
    author: "Jen sincero",
    ratings: 4,
    Thoughts: [
      "You are responsible for what you say and do. You are not responsible for whether or not people freak out about it",

      "If you’re serious about changing your life, you’ll find a way. If you’re not, you’ll find an excuse",
      "What other people think about you has nothing to do with you and everything to do with them.",
    ],
    learnings: `My three favourite takeaways are;

1. Everyone screws up and you’re not special for doing it.
2. You don’t have to hit rock bottom to make a change. You can just decide.
3. If you believe it, it is your truth. Your thoughts and beliefs dictate reality, so if you don’t like your reality, change these.`,
    notes: `“It’s not that the things and opportunities that we want in life don’t exist yet. It’s that we’re not yet aware of their existence (or the fact that we can really have them).” (p. 38)

“You are a badass. You were one when you came screaming onto this planet and you are one now. The Universe wouldn’t have bothered with you otherwise. You can’t screw up so majorly that your badassery disappears. It is who you are. It’s who you will always be. It’s not up for negotiation.” (p. 50)

“Let’s say your story is that you stink at relationships. You get your freedom. You don’t have to commit and can keep looking for the greener grass on the other side. You don’t have to risk getting hurt by being vulnerable. You get to complain about always being single and get sympathy. You get the whole bed to yourself, never have to compromise, and don’t have to shave unless it’s summer.

We don’t realize it, but we’re making the perks we get from perpetuating our story more important than getting the things we really want because it’s familiar territory, it’s what we’re comfy with and we’re scared to let it go.” (p. 142)

“So often we pretend we’ve made a decision, when what we’ve really done is signed up to try until it gets too uncomfortable.” (p. 192)

“Your faith in The Universe must be stronger than your fear of not getting what you want.” (p. 225)`,
  },
]);
let listArr = [];
const uidRef = ref(localStorage.getItem("uid"));

const docRef = doc(db, "books", uidRef.value);
onMounted(async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().bookList) {
      bookList.value = docSnap.data().bookList;
    } else {
      await updateDoc(docRef, {
        bookList: bookList.value,
      });
    }
  } else {
    await setDoc(docRef, {});
    await updateDoc(docRef, {
      bookList: bookList.value,
    });
  }
  store.setBookList(bookList.value);
});

const addBookHandler = async () => {
  if (bookname.value !== "") {
    if (colorRef.value.length > 0) {
      bookList.value.push({
        book: bookname.value,
        color: colorRef.value,
        rotate: `rotate(-${Math.floor(Math.random() * (3 - 0 + 1) + 0)}deg)`,
        details: [],
        bookCover:
          "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/Test%2Fvookie.png?alt=media",
        startDate: "-",
        endDate: "-",
        genre: "",
        author: "",
        ratings: -1,
        Thoughts: [],
        learnings: "",
        notes: "",
      });
      await updateDoc(docRef, {
        bookList: bookList.value,
      });
      store.setBookList(bookList.value);

      store.toastSuccess("Book added on shelf !");
      bookname.value = "";
    } else {
      store.toastError("select color for bookcover !");
    }
  } else {
    store.toastError("Add Name in your book !");
  }
};
const colorHandler = (e) => {
  colorRef.value = e.target.value;
};
const bookNameHandler = (e) => {
  if (e.target.value.length < 20) {
    bookname.value = e.target.value;
  } else {
    store.toastError("word limit over !");
  }
};
const removeItemHandler = async (i) => {
  bookList.value.splice(i, 1);
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
  store.toastSuccess("Book removed from shelf !");
};
const bookSetHandler = (book) => {
  localStorage.setItem("book", book);
};
</script>
<template>
  <div class="book-wrapper">
    <div class="quote-box">
      <h1>{{ quote.quoteText }}</h1>
    </div>
    <div class="book-add-cont">
      <p class="book-h">Add your Book ;)</p>
      <div class="input-box">
        <input
          class="input-name"
          maxlength="20"
          @input="bookNameHandler"
          v-model="bookname"
        />
        <span
          >choose your book color :
          <input class="input-clr" type="color" @input="colorHandler"
        /></span>
      </div>
      <button class="book-btn" @click="addBookHandler">+</button>
    </div>

    <div class="book-shelf-cont">
      <div class="book-shelf">
        <div
          class="book"
          v-for="(book, i) in bookList"
          :key="i"
          :style="{ 'background-color': book.color, transform: book.rotate }"
        >
          <div class="book-tag">
            <router-link :to="`/Journal/${book.book}`">
              <small @click="bookSetHandler(book.book)">{{ book.book }}</small>
            </router-link>
            <img
              class="bin"
              @click="removeItemHandler(i)"
              src="../../assets/bin.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="journal-box">
    <h1 class="line"><i>Your virtual journal , anytime ,anywhere !</i></h1>

    <div class="box">
      <p>
        Welcome to Vookie, your virtual bookshelf and journal where you can
        organize, track and explore your reading journey. Click on book name to
        write journal of your book !
      </p>
    </div>
  </div>
</template>
<style lang="scss">
@import "./book.scss";
.img-sz {
  width: 100px;
  height: 200px;
}
</style>
