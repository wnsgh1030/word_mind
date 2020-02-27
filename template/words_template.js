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
                    const div = document.createElement('div');
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

    let body = `
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
        <td>무엇을</td>
        <td><input type="text" name="w_what" id="w_what" placeholder="what"></td>
    </tr>
    <tr>
        <td>예시</td>
        <td><input type="text" name="w_example" id="w_example" placeholder="example"></td>
    </tr>
    <tr><td>단어 관계</td><td><button class="word_button" type="button" onclick="add_item()"><i class="fas fa-plus-circle"></i>추가</button></td>
    <tr><td colspan="3"><div id="relationfield"></div></td></tr>
    <div id="pre_set" style="display:none"><select name="w2_no">`;
    let i = 0;
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

    let i = 0;
    let select = ''
    while (i < words.length) {
        select = select + `<option value="${words[i].w_no}">${words[i].w_name}</option>`
        i = i + 1;
    }
    select = select + `</select>`;
    let body = `
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
        <td>무엇을</td>
        <td><input type="text" name="w_what" id="w_what" value="${result[0].w_what}"></td>
    </tr>
    <tr>
        <td>예시</td>
        <td><input type="text" name="w_example" id="w_example" value="${result[0].w_example}"></td>
    </tr>
    <tr><td>단어 관계</td><td><button class="word_button" type="button" onclick="add_item()"><i class="fas fa-plus-circle"></i>추가</button></td>
    <tr><td colspan="3"><div id="relationfield">`

    if(relation.length != 0){
        let j = 0;
        while(j < relation.length){
            let relationship = '<div><select name="w2_no">';
            let i = 0;
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
    let body = `<table class="create_table"><tbody>
    <tr><td>단어 이름</td><td>누가</td><td>언제</td><td>어디서</td><td>무엇을</td><td>왜</td><td>어떻게</td><td>예시</td></tr>
    <tr><td>${words[0].w_name}</td><td>${words[0].w_who}</td><td>${words[0].w_when}</td><td>${words[0].w_where}</td>
    <td>${words[0].w_what}</td><td>${words[0].w_why}</td><td>${words[0].w_how}</td><td>${words[0].w_example}</td></tr></table>`;
    i = 0;
    let relationship = `<table class="create_table"><tbody>`;
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