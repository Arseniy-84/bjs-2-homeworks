class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this.state = 100;
		this.type = null;
	}

	fix() {
		this.state *= 1.5;
		if (this.state > 100) {
			this.state = 100;
		}
	}

	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}

	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}


const picknick = new FantasticBook(
	"Аркадий и Борис Стругацкие",
	"Пикник на обочине",
	1972,
	168
);

console.log(picknick.author);
picknick.state = 10;
console.log(picknick.state);
picknick.fix();
console.log(picknick.state);

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) || null;
	}

	giveBookByName(bookName) {
		const bookIndex = this.books.findIndex(book => book.name === bookName);
		if (bookIndex === -1) {
			return null;
		}
		const book = this.books[bookIndex];
		this.books.splice(bookIndex, 1);
		return book;
	}
}


const library = new Library("Центральная городская библиотека");


library.addBook(
	new DetectiveBook(
		"Артур Конан Дойл",
		"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
		2019,
		1008
	)
);
library.addBook(
	new FantasticBook(
		"Аркадий и Борис Стругацкие",
		"Пикник на обочине",
		1972,
		168
	)
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));


console.log(library.findBookBy("name", "Властелин колец"));


console.log(library.findBookBy("releaseDate", 1924).name);


console.log("Количество книг до выдачи: " + library.books.length);
const givenBook = library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length);


if (givenBook) {
	console.log(`Состояние книги до повреждения: ${givenBook.state}`);
	givenBook.state = 20;
	console.log(`Состояние книги после повреждения: ${givenBook.state}`);
	givenBook.fix();
	console.log(`Состояние книги после восстановления: ${givenBook.state}`);
	library.addBook(givenBook);
	console.log("Попытка вернуть книгу с состоянием 30: " + library.books.length);

	givenBook.fix();
	console.log(`Состояние книги после второго восстановления: ${givenBook.state}`);
	library.addBook(givenBook);
	console.log("Попытка вернуть книгу с состоянием 45: " + library.books.length);
}

class Student {
	constructor(name) {
		this.name = name;
		this.marks = {};
	}

	addMark(mark, subject) {

		if (mark < 2 || mark > 5) {
			console.log(`Оценка ${mark} по предмету ${subject} не добавится, так как должна быть от 2 до 5`);
			return;
		}


		if (!this.marks[subject]) {
			this.marks[subject] = [];
		}


		this.marks[subject].push(mark);
	}

	getAverageBySubject(subject) {

		if (!this.marks[subject] || this.marks[subject].length === 0) {
			return 0;
		}


		const sum = this.marks[subject].reduce((total, mark) => total + mark, 0);
		return sum / this.marks[subject].length;
	}

	getAverage() {
		const subjects = Object.keys(this.marks);


		if (subjects.length === 0) {
			return 0;
		}


		const totalSum = subjects.reduce((sum, subject) => {
			return sum + this.getAverageBySubject(subject);
		}, 0);

		return totalSum / subjects.length;
	}
}


const student = new Student("Олег Никифоров");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика");

console.log(student.getAverageBySubject("физика"));
console.log(student.getAverageBySubject("биология"));
console.log(student.getAverage());