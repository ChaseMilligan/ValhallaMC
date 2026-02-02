function copyToClipboard(btn, command) {
	navigator.clipboard.writeText(command).then(() => {
		const originalText = btn.textContent;
		btn.textContent = 'COPIED!';
		btn.style.background = 'rgba(125, 211, 252, 0.25)';
		setTimeout(() => {
			btn.textContent = originalText;
			btn.style.background = 'rgba(125, 211, 252, 0.15)';
		}, 2000);
	});
}

function smoothScroll(event) {
	event.preventDefault();
	const targetId = event.currentTarget.getAttribute('href');
	const targetElement = document.querySelector(targetId);
	targetElement.scrollIntoView({ behavior: 'smooth' });
}

const md = window.markdownit({
	html: true,
	linkify: true,
	typographer: true,
});
console.log(window)
md.use(window.markdownItAttrs);
md.use(window.markdownitContainer, 'section');
md.use(window.markdownitContainer, 'container');
md.use(window.markdownitContainer, 'row');
md.use(window.markdownitContainer, 'col-1');
md.use(window.markdownitContainer, 'col-2');
md.use(window.markdownitContainer, 'col-3');
md.use(window.markdownitContainer, 'col-4');
md.use(window.markdownitContainer, 'col-5');
md.use(window.markdownitContainer, 'col-6');
md.use(window.markdownitContainer, 'col-7');
md.use(window.markdownitContainer, 'col-8');
md.use(window.markdownitContainer, 'col-9');
md.use(window.markdownitContainer, 'col-10');
md.use(window.markdownitContainer, 'col-11');
md.use(window.markdownitContainer, 'col-12');
md.use(window.markdownitContainer, 'componentMeta');
md.use(window.markdownitContainer, "div", {
  validate: (params) => params.trim().match(/^div(\s+.+)?$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^div(?:\s+(.+))?$/);
    if (tokens[idx].nesting === 1) {
      const classes = m && m[1] ? m[1].trim().split(/\s+/) : [];
      return `<div class="div ${classes.join(" ")}">\n`;
    }
    return `</div>\n`;
  },
});