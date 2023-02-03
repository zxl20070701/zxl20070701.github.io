import editorRender from '../../tool/editor/index';
import remove from '../../tool/xhtml/remove';

export default function (navRootEl, editorRootEl, fileName, fileType, fileContent, setCurrentInfo, handle, menuEl) {

    if (menuEl) menuEl.setAttribute('load', 'yes');

    //  导航
    var navItem = document.createElement('li');
    navRootEl.appendChild(navItem);

    navItem.innerText = fileName;

    var navItem_close = document.createElement('em');
    navItem.appendChild(navItem_close);

    navItem_close.innerText = 'X';

    var navItem_unsave = document.createElement('span');
    navItem.appendChild(navItem_unsave);

    navItem_unsave.innerText = '●';

    // 编辑界面
    var editorItem = document.createElement('li');
    editorRootEl.appendChild(editorItem);

    var currentInfo = {
        nav: navItem,
        handle: handle
    };

    // 图片
    if (fileType == 'image') {
        editorItem.style.backgroundImage = 'url(' + fileContent + ')';
        editorItem.setAttribute('class', 'image');
    }

    // 普通文本
    else {

        var options = {
            el: editorItem,
            content: fileContent
        };

        console.log(fileType)

        if (['html', 'svg', 'xml', 'vue'].indexOf(fileType) > -1) {
            options.shader = ['html']
        } else if (['css', 'scss', 'sass'].indexOf(fileType) > -1) {
            options.shader = ['css']
        } else if (['js', 'jsx', 'ts', 'tsx', 'json'].indexOf(fileType) > -1) {
            options.shader = ['javascript']
        }

        var editor = new editorRender(options);

        // 编辑器管理的文本发生改变后会主动触发
        editor.updated(function () {
            navItem.setAttribute('modify', 'yes');
        });

        currentInfo.editor = editor;
    }

    // 关闭
    navItem_close.addEventListener('click', function (event) {
        event.stopPropagation();

        if (navItem.getAttribute('modify') == 'yes') {
            if (!window.confirm('有修改内容未保存，是否确认关闭？')) return;
        }

        // 如果当前是活动窗口
        if (navItem.getAttribute('active') == 'yes') {

            // 如果存在前兄弟
            if (navItem.previousElementSibling) {
                navItem.previousElementSibling.click();
            }

            // 如果存在后兄弟
            else if (navItem.nextElementSibling) {
                navItem.nextElementSibling.click();
            }

            // 否则就需要重置一个参数
            else {
                setCurrentInfo(null);
            }
        }

        // 关闭自己
        if (menuEl) menuEl.setAttribute('load', 'no');
        remove(navItem);
        remove(editorItem);
    });

    // 切换
    navItem.addEventListener('click', function () {
        var j;

        // 导航切换
        var navNodes = navRootEl.children;
        for (j = 0; j < navNodes.length; j++) {
            navNodes[j].setAttribute('active', 'no');
        }
        navItem.setAttribute('active', 'yes');

        // 内容切换
        var editorNodes = editorRootEl.children;
        for (j = 1; j < editorNodes.length; j++) {
            editorNodes[j].style.display = 'none';
        }
        editorItem.style.display = '';

        // 记录
        setCurrentInfo(currentInfo);

    });
    navItem.click();

    // 菜单记录对应的导航
    if (menuEl) menuEl._navItem_ = navItem;

};