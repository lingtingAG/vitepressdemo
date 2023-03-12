# 其它问题

### 查看他人项目时发现 vscode 出现输入文字后如果不立刻输入就会换行的问题
 - 经过检查确定是editorconfig的配置导致的，将下面一行注释即可
```html
insert_final_newline = true # 始终在文件末尾插入一个新行
```

### 使用el-form包裹el-input，是两个input并排时，input之间存在间隙

```css
/*使用font-size: 0;解决*/
font-size: 0;
```