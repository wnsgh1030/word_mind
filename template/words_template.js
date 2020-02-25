exports.words_HTML = (body) => {
    return `
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"> 
            <title>MIND MAP</title>
            <meta charset="utf-8">
            <script language="javascript">
            <!--
                function add_item(){
                    var div = document.createElement('div');
                    div.innerHTML = document.getElementById('pre_set').innerHTML;
                    document.getElementById('relationfield').appendChild(div);
                }
             
                function remove_item(obj){
                    // obj.parentNode 를 이용하여 삭제
                    document.getElementById('relationfield').removeChild(obj.parentNode);
                }
            //-->
            </script>
        </head>
        <body>
        <h1>Mind Map <a href="/"><button class="home"><i class="fas fa-home"></i>home</button></a></h1>
            ${body}
        </body>
        <style>
        ${this.words_style()}
        </style>
        </html>`;
}
exports.create_words_body = (result, words) => {

    var body = `
    <form autocomplete="off" action="/words/create-process" method="post"><table id="create_table">
    <tbody>
    <tr>
        <td>목차 이름</td>
        <td><input type="text" name="c_name" id="c_name" value="${result[0].c_name}" disabled></td>
    </tr>
    <tr>
        <td>단어 이름</td>
        <td><input type="text" name="w_name" id="w_name" placeholder="단어 이름"></td>
    </tr>
    <tr>
        <td>누가</td>
        <td><input type="text" name="w_who" id="w_who" placeholder="who"></td>
    </tr>
    <tr>
        <td>언제</td>
        <td><input type="text" name="w_when" id="w_when" placeholder="when"></td>
    </tr>
    <tr>
        <td>어디서</td>
        <td><input type="text" name="w_where" id="w_where" placeholder="where"></td>
    </tr>
    <tr>
        <td>무엇을</td>
        <td><input type="text" name="w_what" id="w_what" placeholder="what"></td>
    </tr>
    <tr>
        <td>어떻게</td>
        <td><input type="text" name="w_how" id="w_how" placeholder="how"></td>
    </tr>
    <tr>
        <td>왜</td>
        <td><input type="text" name="w_why" id="w_why" placeholder="why"></td>
    </tr>
    <tr>
        <td>예시</td>
        <td><input type="text" name="w_example" id="w_example" placeholder="example"></td>
    </tr>
    <tr><td>단어 관계</td><td><button class="word_button" type="button" onclick="add_item()"><i class="fas fa-plus-circle"></i>추가</button></td>
    <tr><td colspan="3"><div id="relationfield"></div></td></tr>
    <div id="pre_set" style="display:none"><select name="w2_no">`;
    var i = 0;
    while (i < words.length) {
        body = body + `<option value="${words[i].w_no}">${words[i].w_name}</option>`
        i = i + 1;
    }
    body = body +
        `</select>
    <input type="text" name="description" placeholder="관계 설명"><button class="word_button" type="button" id="remove" onclick="remove_item(this)"><i class="fas fa-minus-circle"></i>삭제</button></div>
    <tr>
        <input type="hidden" name="c_no" id="c_no" value=${result[0].c_no}>
        <input type="hidden" name="s_no" id="s_no" value=${result[0].s_no}>
        <td><button class="word_button" type="submit" id="create_button"><i class="fas fa-plus"></i>생성</button></td></form>
       <td><a href="/subjects/${result[0].s_no}"><button class="word_button" type="button" class="back_button"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`
    return body;
}
exports.update_words_body = (result, words, relation) => {

    var i = 0;
    var select = ''
    while (i < words.length) {
        select = select + `<option value="${words[i].w_no}">${words[i].w_name}</option>`
        i = i + 1;
    }
    select = select + `</select>`;
    var body = `
    <form autocomplete="off" action="/words/update-process" method="post"><table id="update_table">
    <tbody>
    <tr>
        <td>목차 이름</td>
        <td><input type="text" name="c_name" id="c_name" value="${result[0].c_name}" disabled></td>
    </tr>
    <tr>
        <td>단어 이름</td>
        <td><input type="text" name="w_name" id="w_name" value="${result[0].w_name}"></td>
    </tr>
    <tr>
        <td>누가</td>
        <td><input type="text" name="w_who" id="w_who" value="${result[0].w_who}"></td>
    </tr>
    <tr>
        <td>언제</td>
        <td><input type="text" name="w_when" id="w_when" value="${result[0].w_when}"></td>
    </tr>
    <tr>
        <td>어디서</td>
        <td><input type="text" name="w_where" id="w_where" value="${result[0].w_where}"></td>
    </tr>
    <tr>
        <td>무엇을</td>
        <td><input type="text" name="w_what" id="w_what" value="${result[0].w_what}"></td>
    </tr>
    <tr>
        <td>어떻게</td>
        <td><input type="text" name="w_how" id="w_how" value="${result[0].w_how}"></td>
    </tr>
    <tr>
        <td>왜</td>
        <td><input type="text" name="w_why" id="w_why" value="${result[0].w_why}"></td>
    </tr>
    <tr>
        <td>예시</td>
        <td><input type="text" name="w_example" id="w_example" value="${result[0].w_example}"></td>
    </tr>
    <tr><td>단어 관계</td><td><button class="word_button" type="button" onclick="add_item()"><i class="fas fa-plus-circle"></i>추가</button></td>
    <tr><td colspan="3"><div id="relationfield">`

    if(relation.length != 0){
        var j = 0;
        while(j < relation.length){
            var relationship = '<div><select name="w2_no">';
            var i = 0;
            while(i < words.length){
                if(relation[j].w2_no == words[i].w_no){
                    relationship = relationship +`<option value="${words[i].w_no}" selected="selected">${words[i].w_name}</option>`;
                    
                }
                else{
                    relationship = relationship +`<option value="${words[i].w_no}">${words[i].w_name}</option>`;
                }
                i = i + 1;
            }
            relationship = relationship + `<input type="text" name="description" value="${relation[j].description}" ><button class="word_button" type="button" id="remove" onclick="remove_item(this)"><i class="fas fa-minus-circle"></i>삭제</button></div>`
            j = j + 1;
            body = body + relationship;
        }
       
    }
    body = body + `</div></td></tr><div id="pre_set" style="display:none"><select name="w2_no">` + select + `
    <input type="text" name="description" placeholder="관계 설명"><button class="word_button" type="button" id="remove" onclick="remove_item(this)"><i class="fas fa-minus-circle"></i>삭제</button></div>
    <tr>
        <input type="hidden" name="w_no" id="w_no" value=${result[0].w_no}>
        <input type="hidden" name="s_no" id="s_no" value=${result[0].s_no}>
        <td><button class="word_button" type="submit" id="update_button"><i class="fas fa-plus"></i>수정</button></td></form>
       <td><a href="/subjects/${result[0].s_no}"><button class="word_button" type="button" class="back_button"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
    return body;
}

exports.words_body = (words, relation) => {
    var body = `<table class="create_table"><tbody>
    <tr><td>단어 이름</td><td>누가</td><td>언제</td><td>어디서</td><td>무엇을</td><td>왜</td><td>어떻게</td><td>예시</td></tr>
    <tr><td>${words[0].w_name}</td><td>${words[0].w_who}</td><td>${words[0].w_when}</td><td>${words[0].w_where}</td>
    <td>${words[0].w_what}</td><td>${words[0].w_why}</td><td>${words[0].w_how}</td><td>${words[0].w_example}</td></tr></table>`;
    i = 0;
    var relationship = `<table class="create_table"><tbody>`;
    while (i < relation.length){
        relationship = relationship + `<tr><td>연관 단어</td><td>연관 내용</td></tr> <tr><td>${relation[i].w_name}</td><td>${relation[i].description}</td></tr>`;
        i = i + 1;
        if(i == relation.length){
            relationship = relationship + `<tbody></table>`;
            body = body + relationship;
        }
    }
    return body;
}
exports.words_style = () => {
    return `
    body{
        color: #4B89DC;
        text-align: center;
        width: 1900px;
    }
    h1{
        font-size: 80px;
    }
    .home{
        color: #4B89DC;
        background-color: white;
        border: none;
    }
    table{
        margin: auto;
        font-size: 40px;
        border : 1px solid #4B89DC;
        border-collapse: collapse;
        margin-bottom: 50px;
    }
    .word_button{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 40px;
        background-color: white;
        border: none;
    }
    .word_button:hover{
        color: white;
        background-color: #4B89DC;
        box-shadow: 0px 15px 20px #4B89DC;
        transform: translateY(-10px);
    }
    td {
        border: 1px solid #4B89DC;
    }
    select{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 40px;
        background-color: white;
        border: 1px solid;
    }
    input{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 40px;
        background-color: white;
        border: none;
        text-align: left;
    }
    div#relationfield{
        text-align:center;
    }
    button#remove{
        border: 1px solid #4B89DC;
    }
    button#remove:hover{
        color: white;
        background-color: #4B89DC;
        box-shadow: 0px 15px 20px #4B89DC;
        transform: translateY(-10px);
    }
    

    `
}