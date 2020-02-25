exports.subjects_HTML = (body, style) => {
    return `
    <!doctype html>
    <html>
    <head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"> 
        <title>MIND MAP</title>
        <meta charset="utf-8">
    </head>
    <body>
    <h1>Mind Map <a href="/"><button class="home"><i class="fas fa-home"></i>home</button></a></h1>
    ${body}
    </body>
    <style>
    ${style}
    </style>
    </html>`;
}
exports.subjects_body = (subjects, contents_words, s_no, subject) => {
    var body =  `<div id="subjects_map"><table id="subjects_table">
    <tr>`;
    var i = 0;
    while(i < subjects.length){
        body = body + `<td><a href="/subjects/${subjects[i].s_no}"><button class="subject_button"><i class="fas fa-arrow-left"></i> ${subjects[i].s_name}</button></a></td>`;
        i = i + 1;
    }
    body = body +`</tr></table><iframe src="/map/${s_no}"></iframe></div>`;
    var content = `<div id="content"><table id="words"><tr><td colspan=4><form id="content_create"action="/contents/create-form" method="get">${subject[0].s_name}
    <input type="hidden" name="s_no" value=${s_no}></td>
    <td><button type="submit" class="content_word"><i class="fas fa-plus"></i>목차 생성</button></form></td></tr>`;
    i = 0;
    var j = 0;
    while(i < contents_words.length){
        content = content + `<tr><td colspan=2><i class="fas fa-ellipsis-v"></i>${contents_words[i].c_name}</td>
        <td><form action="/contents/update-form" method="get">
        <input type="hidden" name="c_no" value=${contents_words[i].c_no}>
        <button type="submit" class="content_word"><i class="fas fa-pen"></i>목차 수정</button></form></i></td>
        <td><form action="/contents/delete-process" method="post">
        <input type="hidden" name="c_no" value=${contents_words[i].c_no}>
        <input type="hidden" name="s_no" value=${s_no}>
        <button type="submit" class="content_word"><i class="fas fa-trash-alt"></i>목차 삭제</button></form></i></td>
        <td><form action="/words/create-form" method="get">
        <input type="hidden" name="c_no" value=${contents_words[i].c_no}>
        <input type="hidden" name="s_no" value=${s_no}>
        <button type="submit" class="content_word"><i class="fas fa-plus"></i>단어 생성</button></form></i></td>
        </tr>
        </tr>`;
        j = 0 ;
        while(j < contents_words[i].words.length){
            content = content + `<tr><td><i class="fas fa-angle-double-right"></i></td><td><a href='/words/${contents_words[i].words[j].w_no}'>
            <button class="content_word">${contents_words[i].words[j].w_name}</button></a></td>
            <td><form action="/words/update-form" method="get">
            <input type="hidden" name="w_no" value=${contents_words[i].words[j].w_no}>
            <input type="hidden" name="s_no" value=${s_no}>
            <button type="submit" class="content_word"><i class="fas fa-pen"></i>단어 수정</button></form></i></td>
            <td><form action="/words/delete-process" method="post">
            <input type="hidden" name="w_no" value=${contents_words[i].words[j].w_no}>
            <input type="hidden" name="s_no" value=${s_no}>
            <button type="submit" class="content_word"><i class="fas fa-trash-alt"></i>단어 삭제</button></form></i></td>
            </tr>`;
            j = j + 1;
        }
        i = i + 1;
    }
    content = content + `</table></div>`;
    return body + content;
}
exports.create_subjects_body = () => {
    return `<table id="create_table">
    <tbody>
    <form autocomplete="off" action="/subjects/create-process" method="post">
    <tr>
        <td>이름</td>
        <td><input type="text" name="s_name" id="s_name" placeholder="이름"></td>
    </tr>
    <tr>
        <td>목적</td>
        <td><input type="text" name="s_purpose" id="s_purpose" placeholder="목적"></td>
    </tr>
    <tr>
        <td><button class="cu" type="submit" id="create"><i class="fas fa-plus"></i>추가</button></td></form>
       <td><a href="/"><button class="cu"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
}
exports.update_subjects_body = (subject) => {
    return `<table id="update_table">
    <tbody>
    <form autocomplete="off" action="/subjects/update-process/${subject[0].s_no}" method="post">
    <tr>
        <td>이름</td>
        <td><input type="text" name="s_name" id="s_name" value="${subject[0].s_name}"></td>
    </tr>
    <tr>
        <td>목적</td>
        <td><input type="text" name="s_purpose" id="s_purpose" value="${subject[0].s_purpose}"></td>
    </tr>
    <tr>
        <td><button class="cu" type="submit" id="update"><i class="fas fa-pen"></i>수정</button></td></form>
       <td><a href="/"><button class="cu"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
}
exports.subjects_style = () => {
    return `
    body{
        color: #4B89DC;
        text-align: center;
    }
    h1{
        font-size: 80px;
    }
    .home{
        color: #4B89DC;
        background-color: white;
        border: none;
    }
    iframe {
        height: 70vh;
        width: 60vw;
        top: 0px;
        left: 0px;
    }
    div#subjects_map{
        width: 60%;
        float: right;
    }
    div#content{
        width: 40%;
        float: left;
        font-size: 20px;
    }
    table#subjects_table{
        float:right;
    }
    table#subjects_table button{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 20px;
        background-color: white;
        border: none;
    }
    table#subjects_table button:hover{
        color: white;
        background-color: #4B89DC;
        box-shadow: 0px 15px 20px #4B89DC;
        transform: translateY(-10px);
    }
    form#content_create{
        width: 400px;
    }
    table#words td{
        border : 1px solid #4B89DC;
    }
    .content_word{
        width: 100%;
        color: #4B89DC;
        font-size: 20px;
        background-color: white;
        border: none;
    }
    .content_word:hover{
        color: white;
        background-color: #4B89DC;
        box-shadow: 0px 15px 20px #4B89DC;
        transform: translateY(-10px);
    }
    `;
}
exports.create_update_subjects_style = () => {
    return `
    body{
        color: #4B89DC;
        text-align: center;
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
        font-size: 50px;
        border : 1px solid #4B89DC;
    }
    .cu{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 50px;
        background-color: white;
        border: none;
    }
    .cu:hover{
        color: white;
        background-color: #4B89DC;
        box-shadow: 0px 15px 20px #4B89DC;
        transform: translateY(-10px);
    }
    td {
        border: 1px solid #4B89DC;
    }
    input{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 50px;
        background-color: white;
        border: none;
        text-align: left;
    }`;
}