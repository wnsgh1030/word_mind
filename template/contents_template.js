exports.contents_HTML = (body) => {
    return `
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"> 
            <title>MIND MAP</title>
            <meta charset="utf-8">
        </head>
        <body>
        <h1>Mind Map</h1>
            ${body}
        </body>
        <style>
        ${this.contents_style()}
        </style>
        </html>`;
}
exports.create_contents_body = (subject) => {
    return `<table id="create_table">
    <tbody>
    <form autocomplete="off" action="/contents/create-process" method="post">
    <tr>
        <td>과목 이름</td>
        <td><input type="text" name="s_name" id="c_name" value="${subject[0].s_name}" disabled></td>

    </tr>
    <tr>
        <td>목차 이름</td>
        <td><input type="text" name="c_name" id="c_name" placeholder="목차 이름"></td>
    </tr>
    <tr>
        <input type="hidden" name="s_no" id="s_no" value=${subject[0].s_no}>
        <td><button type="submit" id="create_button"><i class="fas fa-plus"></i>생성</button></td></form>
       <td><a href="/subjects/${subject[0].s_no}"><button class="back_button"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
}
exports.update_contents_body = (content) => {
    return `<table id="create_table">
    <tbody>
    <form autocomplete="off" action="/contents/update-process" method="post">
    <tr>
        <td>과목 이름</td>
        <td><input type="text" name="s_name" id="c_name" value="${content[0].s_name}" disabled></td>

    </tr>
    <tr>
        <td>목차 이름</td>
        <td><input type="text" name="c_name" id="c_name" value="${content[0].c_name}"></td>
    </tr>
    <tr>
        <input type="hidden" name="s_no" id="s_no" value=${content[0].s_no}>
        <input type="hidden" name="c_no" id="c_no" value=${content[0].c_no}>
        <td><button type="submit" id="create_button"><i class="fas fa-plus"></i>수정</button></td></form>
       <td><a href="/subjects/${content[0].s_no}"><button class="back_button"><i class="fas fa-arrow-left"></i>뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
}
exports.contents_style = () => {
    return `
    body{
        color: #4B89DC;
        text-align: center;
        width: 1900px;
    }
    h1{
        font-size: 80px;
    }
    table{
        margin: auto;
        font-size: 50px;
        border : 1px solid #4B89DC;
    }
    button{
        color: #4B89DC;
        width: 100%;
        height: 100%;
        font-size: 50px;
        background-color: white;
        border: none;
    }
    button:hover{
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
    }
    `;
}