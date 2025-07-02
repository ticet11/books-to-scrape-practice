import puppeteer from "puppeteer";

const scrape = async () => {
	const browser = await puppeteer.launch({ devtools: true });
	const page = await browser.newPage();

	const url = "https://books.toscrape.com/";

	await page.goto(url);

	const books = await page.evaluate(() => {
		const bookElements = document.querySelectorAll(".product_pod");
		const bookArray = Array.from(bookElements).map((book) => {
			const title = book.querySelector("h3 a").getAttribute("title");
			const price = book.querySelector(".price_color").textContent;
			const availability =
				book.querySelector(".availability").textContent.trim() || "Not available";
			const numbersObj = {
				Zero: 0,
				One: 1,
				Two: 2,
				Three: 3,
				Four: 4,
				Five: 5,
			};
			const text_rating = book.querySelector("p.star-rating").className.split(" ")[1];
			const rating = numbersObj[text_rating] || 0;
			const link = `${location.href}${book.querySelector("h3 a").getAttribute("href")}`;
			return {
				title,
				price,
				availability,
				rating,
				link,
			};
		});
		return bookArray;
	});

	await browser.close();
};

scrape();
