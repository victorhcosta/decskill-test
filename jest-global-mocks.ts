var storageMock = (function () {
	var store: any = {};
	return {
		getItem: function (key: string | number) {
			return store[key];
		},
		setItem: function (key: string | number, value: { toString: () => any; }) {
			store[key] = value.toString();
		},
		clear: function () {
			store = {};
		},
		removeItem: function (key: string | number) {
			delete store[key];
		},
	};
})();
Object.defineProperty(window, 'localStorage', { value: storageMock });
Object.defineProperty(window, 'sessionStorage', { value: storageMock });
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
	value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ({
		display: 'none',
		appearance: ['-webkit-appearance'],
	}),
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
	value: () => ({
		enumerable: true,
		configurable: true,
	}),
});
