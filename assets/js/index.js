// 1. Реалізувати клас Post (наприклад, описує пост в соц. мережі).

// Властивості:
// id,
// назва,
// автор,
// текст,
// дата додавання,
// кількість вподобайок,
// *зображення,
// *список хештегів,
// можна використати додаткові властивості за бажанням.

class RangeValidator {
  constructor(from, to) {
    if (typeof from !== "number" || typeof to !== "number") {
      throw new TypeError('Value "from" or "to" are not must be a number');
    }
    if (from > to) {
      throw new RangeError("From can not be lesser that to");
    }
    this.from = from;
    this.to = to;
  }

  get from() {
    return this._from;
  }

  set from(value) {
    if (typeof value !== "number") {
      throw new TypeError('Value "from" must be a number');
    }
    if (value > this._to) {
      throw new RangeError("From cannot be greater than to");
    }
    this._from = value;
  }

  get to() {
    return this._to;
  }

  set to(value) {
    if (typeof value !== "number") {
      throw new TypeError('Value "from" must be a number');
    }
    if (value < this._from) {
      throw new RangeError("From cannot be greater than to");
    }
    this._to = value;
  }

  get range() {
    return [this._from, this._to];
  }

  isValid(value) {
    if (typeof value !== "number") {
      throw new TypeError("Value must be a number");
    }
    return value >= this.from && value <= this.to;
  }
}

class Post {
  constructor(
    id,
    title,
    author,
    postingDate = new Date().toLocaleDateString(),
    text,
    numberOfLikes = 0,
    image = null,
    hashtag = [],
    views = 0
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.postingDate = postingDate;
    this.text = text;
    this.numberOfLikes = numberOfLikes;
    this.image = image;
    this.hashtag = hashtag;
    this.views = views;
    this.likeValodator = new RangeValidator(0, 100);
  }

  // змінити текст поста на інший.

  changeText(newText) {
    this.text = newText;
  }

  // збільшити кількість вподобайок на 1 / зменшити кількість вподобайок на 1.

  addLike() {
    this.numberOfLikes += 1;
  }

  deleteLike() {
    if (this.numberOfLikes > 5) {
      this.numberOfLikes -= 1;
    }
  }

  addView() {
    this.views += 5;
  }

  // render для отримання розмітки для посту (*в методі деструктуризувати інформацію з this).

  render() {
    const {
      id,
      title,
      author,
      postingDate,
      text,
      numberOfLikes,
      image,
      hashtag,
      views,
    } = this;

    const newHashtagColor = hashtag.map(
      (hashtag) =>
        `<span style="color: ${TAG_COLORS[hashtag]};">#${hashtag}</span>`
    );
    document.write(`
    <article class="post" id = "post-${id}">
      <h2 class="post-title">${title}</h2>      
        ${
          image ? `<img class="post-img" src="${image}" alt="Post image">` : ""
        } 
        <p class ="post-text">${text}</p>
        <p class="post-author">Post by ${author} at ${postingDate}</p>
        <p class="post-like">Likes: ${numberOfLikes}</p>
        <p class="post-hashtag">Hashtags: ${newHashtagColor.join(", ")}</p>
        <p class="post-views">Views: ${views}</p>
    </article>
    `);
  }

  // *сеттер з валідацією для кількості вподобайок та відповідний ґеттер. *Для перевірки, чи належить кількість вподобайок певному діапазону, можна використати клас нижче.

  get validLikeValue() {
    return this._numbersOfLike;
  }

  set validLikeValue(value) {
    if (this.likeValodator.isValid(value)) {
      this._numbersOfLike = value;
    } else {
      throw new RangeError(
        `Indalid value of likes:${value}. It must be betwee ${this.likeValodator.from} and ${this.likeValodator.to}`
      );
    }
  }

  // *додавання хештеґу. Хештеґів у поста може бути максимум 6. Можливі значення обмежені певним переліком (наприклад, ['web', 'javascript', 'fullstack', 'education', тощо]).

  addHashtag(hash) {
    const validHashtag = [
      "web",
      "javascript",
      "fullstack",
      "education",
      "frontend",
      "backend",
      "react",
    ];
    if (
      this.hashtag.length < 6 &&
      validHashtag.includes(hash) &&
      validHashtag !== "string"
    ) {
      this.hashtag.push(hash);
    } else {
      throw new Error(
        "Invalid hashtag name(or type) or max number of hashtags reached"
      );
    }
  }
}
// *Різні хештеги підсвічувати різним кольором. Як варіант, для доступу до кольору хештегу зручно використовувати конструкцію
const TAG_COLORS = {
  web: "green",
  javascript: "orange",
  fullstack: "blue",
  education: "red",
  frontend: "violet",
  backend: "plum",
  developer: "blueviolet",
  react: "lightskyblue",
};

const post = new Post(
  1,
  "Let`s Learn JS!!",
  "Joe Doe",
  new Date().toLocaleDateString(),
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, doloribus minus nesciunt nemo nisi magni provident eum voluptas perspiciatis nobis!",
  12,
  "https://i.pinimg.com/564x/75/84/6e/75846e2f93bccc54e1284d05befd7f44.jpg",
  ["fullstack", "javascript", "education"],
  11
);

try {
  post.addHashtag("frontend");
} catch (err) {
  console.error("err :>> ", err);
}

try {
  post.changeText("new text is here");
} catch (err) {
  console.log(err);
}

try {
  post.validLikeValue = 22;
  console.log(post.validLikeValue);
} catch (err) {
  console.error(err);
}

try {
  post.validLikeValue = -22;
  console.log(post.validLikeValue);
} catch (err) {
  console.error(err);
}

// *Створити масив постів (достатньо 2-3), тобто елементами масиву будуть екземпляри класу. Відрендерити ці пости (перебравши масив).

const posts = [
  new Post(
    1,
    "Let`s Learn JS!!",
    "Joe Doe",
    new Date().toLocaleDateString(),
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, doloribus minus nesciunt nemo nisi magni provident eum voluptas perspiciatis nobis!",
    12,
    "https://i.pinimg.com/564x/75/84/6e/75846e2f93bccc54e1284d05befd7f44.jpg",
    ["fullstack", "javascript", "education"],
    11
  ),
  new Post(
    2,
    "Mastering React",
    "Jane Smith",
    new Date().toLocaleDateString(),
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, officia molestias. Dolore quod facere, optio consequatur nostrum.",
    8,
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*odW0CyTVxMVt5s3yhjjOhw.png",
    ["react", "frontend"],
    15
  ),
  new Post(
    3,
    "Backend Development",
    "John Williams",
    new Date().toLocaleDateString(),
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, odio vitae. Animi, et? Mollitia, nobis? Voluptas, autem. Quasi, ad?",
    5,
    "https://www.interviewbit.com/blog/wp-content/uploads/2021/09/backend.jpg",
    ["backend", "fullstack"],
    20
  ),
];

posts.forEach((post) => post.render());
posts.forEach((post) => post.addLike());
posts.forEach((post) => post.addLike());
posts.forEach((post) => post.render());
posts.forEach((post) => post.deleteLike());
posts.forEach((post) => post.render());

// 2. *Реалізувати клас RangeValidator.
// Клас призначений для валідації потрапляння числового значення в діапазон (тобто якщо діапазон {from: 0, to: Infinity}, то невід'ємні числа потрапляють в діапазон, а від'ємні - ні).

// Границі діапазону є властивостями:
// ■ from (типу number);
// ■ to (типу number);
// (from <= to)

const range1 = new RangeValidator(1, 5.5);

try {
  range1.from = 5;
  console.log(range1.from);
} catch (err) {
  console.error(err);
}

try {
  range1.from = 200;
  console.log(range1.from);
} catch (err) {
  console.error(err);
}

try {
  range1.to = 80;
  console.log(range1.to);
} catch (err) {
  console.error(err);
}

try {
  range1.to = -55;
  console.log(range1.to);
} catch (err) {
  console.error(err);
}

try {
  console.log(range1.from);
} catch (err) {
  console.error(err);
}

try {
  console.log(range1.to);
} catch (err) {
  console.error(err);
}

try {
  console.log(range1.range);
} catch (err) {
  console.error(err);
}

try {
  console.log(range1.isValid(10));
} catch (err) {
  console.error(err);
}

try {
  console.log(range1.isValid(100));
} catch (err) {
  console.error(err);
}
