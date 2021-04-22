const header = document.querySelector('header.header-news');

const someDiv = document.createElement('div');

someDiv.classList.add('ad-banner');

header.appendChild(someDiv);

const myAge = 87;

someDiv.innerHTML = `
<a href="google.com">Click Me</a>
asdlfkj
lkjasdflkas
${myAge}
aksdfklj
abcd
`;
