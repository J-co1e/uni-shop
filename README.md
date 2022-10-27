# uni_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
"tabBar": {
		"selectedColor": "#c00000",
		"list": [
			{
				"pagePath": "pages/home/index",
				"text": "主页",
				"iconPath": "static/tab_icons/home.png",
				"selectedIconPath": "static/tab_icons/home-active.png"
			},
			{
				"pagePath": "pages/cate/index",
				"text": "分类",
				"iconPath": "static/tab_icons/cate.png",
				"selectedIconPath": "static/tab_icons/cate-active.png"
			},
			{
				"pagePath": "pages/cart/index",
				"text": "购物车",
				"iconPath": "static/tab_icons/cart.png",
				"selectedIconPath": "static/tab_icons/cart-active.png"
			},
			{
				"pagePath": "pages/my/index",
				"text": "我的",
				"iconPath": "static/tab_icons/my.png",
				"selectedIconPath": "static/tab_icons/my-active.png"
			}
		]
	}
See [Configuration Reference](https://cli.vuejs.org/config/).
