exports.map_HTML = (body) => {
    return `<html>
    <head>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.14.0/cytoscape.min.js"></script>
      <script src="https://unpkg.com/layout-base/layout-base.js"></script>
      <script src="https://unpkg.com/cose-base/cose-base.js"></script>
      <script src="../script/cytoscape-cose-bilkent.js"></script>
    </head>
    <style>
      #cy {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
      }
    </style>
    <body>  
      <div id="cy"></div>
      <script>
        const data = ${JSON.stringify(body)}
        var cy = cytoscape({
    
          container: document.getElementById('cy'), // container to render in
    
          elements: data,
    
          style: [ // the stylesheet for the graph
            {
              selector: 'node',
              style: {
    
                'background-color': '#666',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'border-color': 'black',
                'border-width': 4,
                'background-color': 'white'
    
              }
            },
            {
              selector: 'node[type="subject"]',
              style: {
                'shape': 'pentagon',
                'width': '100px',
                'height': '100px',
                'font-size': '20px'
              }
            },
            {
              selector: 'node[type="contents"]',
              style: {
                'shape': 'diamond',
                'width': '60px',
                'height': '60px',
                'font-size': '8px'
              }
            },
            {
              selector: 'node[type="words"]',
              style: {
                'width': '40px',
                'height': '40px',
                'font-size': '6px'
              }
            },
            {
              selector: 'edge',
              style: {
                'label': 'data(label)',
                'width': 3,
                'line-color': '#ccc',
                'curve-style': 'bezier',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'font-size': '10px'
              }
            },
            {
              selector: 'edge[type="word-word"]',
              style:{
                "line-style": "dotted"  
              }
            }
          ],
    
          layout: {
            name: 'cose-bilkent',
            animate: false,
            gravityRangeCompound: 1.5,
            fit: true,
            tile: true
          }

    
    
        });
        cy.on('tap', function (e) {
          const url = e.target.data('url')
          if (url && url !== '') {
              window.open(url);
          }
      });
      </script>
    </body>
    
    </html>`;
}
exports.map_body = (subject, contents, words, relationship) => {
    var data = new Array();
    var subject = { data: { id: 'subject', label: subject[0].s_name, type: 'subject' } };
    data.push(subject);

    var i = 0;
    while (i < contents.length){
      var content = {data: {id: `content${contents[i].c_no}`, label: contents[i].c_name, type: 'contents'}};
      var edge = {data: {id: `subject_content${contents[i].c_no}`, label: '', source: 'subject', target: `content${contents[i].c_no}`, type: 'subject-content'}};
      data.push(content);
      data.push(edge);
      i = i + 1;
    }
    i = 0
    while(i < words.length){
      
      var word = {data: {id: `word${words[i].w_no}`, label: words[i].w_name, type: 'words', url: `/words/${words[i].w_no}`}};
      var edge = {data: {id: `content${words[i].c_no}_word${words[i].w_no}`, label: '', source: `content${words[i].c_no}`, target: `word${words[i].w_no}`, type: 'content-word'}};
      data.push(word);
      data.push(edge);
      i = i + 1;
    }
    i = 0
    while(i < relationship.length){
      var edge = {data:{id: `word${relationship[i].w1_no}_word${relationship[i].w2_no}`, label: `${relationship[i].description}`, source: `word${relationship[i].w1_no}`, target: `word${relationship[i].w2_no}`, type: 'word-word'}};
      data.push(edge);
      i = i + 1;
    }
    return data
}