轮播图实现
=================================

YIGO配置
---------------------------------

1. 添加一个轮播图的表单
2. 添加一个表格
3. 表格中需要添加一个图片字段和一个文本字段(可选)

手机端配置
---------------------------------

    使用GridCarousel控件来实现

```javascript
    <ImageCarouselGrid
        needThumbnail={false}
        w={1000}
        h={400}
        style={{ height: 150, width: '100%' }}
        yigoid="detail"
        imageColumn="ImgPath"
        textColumn="Description"
    />
```

```javascript 
    "type": "element",
    "elementType": "ImageCarouselGrid",
    "elementProps": {
        "yigoid": "detail",
        "w": 1000,
        "h": 400,
        "style: : {
            height: 150,
            width: "100%"
        },
        "imageColumn": "ImgPath",
        "textColumn": "Description"
    }
```

控件属性
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|名称    |描述      |默认值    |
|------|----------|------------|
| needThumbnail   |是否使用缩略图         | false      |
|w   |  宽度     | 1000    |
|h   |  高度     | 1000    |
|style|  样式    |         |
|yigoid | 表格key  |         |
|imageColumn| 图片列的key |               |
|textColumn | 文本列的key |                 |
