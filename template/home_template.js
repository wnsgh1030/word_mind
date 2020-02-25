exports.home_HTML = (body) => {
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
    ${this.home_style()}
    </style>
    </html>`;
}
exports.home_body = (result) => {
    var body = `<table id="subjects">
    <thead>
      <tr>
          <td id="name">이름</td>
          <td id="purpose">목적</td>
          <td colspan="2"><a href="/subjects/create-form"><button id="create"><i class="fas fa-plus"></i> 생성</button></a></td>
      </tr>
    </thead>
    <tbody>`;
    var i = 0;
    while (i < result.length) {
        body = body + `<tr><td><a href="/subjects/${result[i].s_no}"><button class="subjects"><i class="fas fa-location-arrow"></i> ${result[i].s_name}</button></a></td>
        <td>${result[i].s_purpose}</td>
        <td class="button"><a href="/subjects/update-form/${result[i].s_no}"><button class="ud"><i class="fas fa-pen"></i> 수정</button></a></td>
        <form autocomplete="off" action="/subjects/delete-process/${result[i].s_no}" method="post">
        <td class="button"><button type=submit class="ud"><i class="fas fa-trash-alt"></i> 삭제</button></form></td></tr>`;
        i = i + 1;
    }
    return body;
}
exports.home_style = () => {
    return `
        body{
            color: #4B89DC;
            text-align: center;
        }
        h1{
            font-size: 80px;
        }
        table#subjects{
            margin: auto;
            font-size: 50px;
            border : 1px solid #4B89DC;
        }
        thead td{
            font-weight: bold;
            background-color: #4B89DC;
            border : 1px solid white;
            color: white;
        }
        tbody td{
            border : 1px solid #4B89DC;
        }
        button#create{
            color: white;
            width: 100%;
            height: 100%;
            font-size: 50px;
            background-color: #4B89DC;
            border: none;
        }
        button#create:hover{
            color: #4B89DC;
            background-color: white;
            box-shadow: 0px 15px 10px #4B89DC;
            transform: translateY(-4px);
            border: 1px solid #4B89DC;
        }
        .ud{
            color: #4B89DC;
            width: 100%;
            height: 100%;
            font-size: 50px;
            background-color: white;
            border: none;
        }
        .ud:hover{
            color: white;
            background-color: #4B89DC;
            box-shadow: 0px 15px 20px #4B89DC;
            transform: translateY(-10px);
        }
        .subjects{
            color: #4B89DC;
            width: 100%;
            height: 100%;
            font-size: 50px;
            background-color: white;
            border: none;
            text-align: left;
        }
        .subjects:hover{
            color: white;
            background-color: #4B89DC;
            box-shadow: 0px 15px 20px #4B89DC;
            transform: translateY(-10px);
        }`;
}