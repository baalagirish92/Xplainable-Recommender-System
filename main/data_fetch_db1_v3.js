function create_graph(node_names, node_labels, i) {
    // var nodes = new vis.DataSet(node_names.map((label, id) => { return { id: id + 1, label: label } }));
    var nodes_details = []
    for (num = 0; num < node_names.length; num++) {
        nodes_details[num] = {
            'id': num,
            'label': node_names[num] + '\n\n' + 'Type: ' + node_labels[num],
            // 'title': node_labels[num]
        }
    }

    var edge_details = []
    for (num = 0; num < node_names.length; num++) {
        if (num != node_names.length - 1)
            edge_details[num] = {
                'from': num,
                'to': num + 1,
                'width': 1,
                'length': 20
            }
    }
    // create an array with edges
    // var edges = new vis.DataSet(node_names.map((_, index) => { return { 'from': index + 1, 'to': index + 2, 'width': 1, 'length': 10 }; }));
    var nodes = new vis.DataSet(nodes_details)
    var edges = new vis.DataSet(edge_details)
    // console.log(edges)
    // create a network

    var container = document.getElementById('graph-container-' + i);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            color: '#A4D3E5',
            fixed: false,
            shape: 'box',
            widthConstraint: 300,

        },

        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.7,
                    type: 'arrow',

                    // imageHeight: 10
                },
            },
            // length: 15,
        },

        interaction: {
            // dragView: true,
            zoomView: true,
        },
        layout: {
            randomSeed: -150,
            //improvedLayout: true,
            // improvedLayout: true,
            // clusterThreshold: 150,
            hierarchical: {
                enabled: false,
                direction: 'UD'  // roots, leaves
            }
        },

        physics: {
            stabilization: {
                enabled: true // <------ Disables animation.
            }
        }

    };
    var network = new vis.Network(container, data, options);
    // console.log(network.getViewPosition(),network.canvasToDOM(network.getViewPosition()))

}

function toggleCollapse(event) {
    el = event.currentTarget.parentElement.querySelector('.card-body');
    // console.log(el, el.className)
    if (el.classList.contains('card-body-expand')) {
        el.classList.remove('card-body-expand');
        el.classList.add('card-body-collapse');
    }
    else {
        el.classList.remove('card-body-collapse');
        el.classList.add('card-body-expand');
    }
}



function get_User_data(file, user_id) {
    fetch(file)
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            try {
                json = json[user_id]

                for (i = 0; i < 10; i++) {
                    heading = "heading" + i;
                    button_id = "paper" + i;
                    target_id = "collapse" + i;

                    nodes = json.Paths[i].map(path => {
                        if (path.name) return path.name
                        else return path.title
                    });

                    node_labels = json.Paths[i].map(path => {
                        if (path.label) return path.label
                        // else return path.title
                    });

                    $("#accordion").append('<div class="card">' +
                        ' <div class=" card-header text-center text-white fw-bold" id="' + heading + '" onclick=toggleCollapse(event)>' +
                        '<button type="button" class="btn-success w-100"><h5>' + json.Recommendations[i].title + '</h5>' +
                        '<div class="badge bg-warning text-dark"><h6><b><i> ' +
                        ' * ' + json.Explanation[i] +
                        '</i></b></h6></div>' +
                        '</button></div>' +
                        '<div class="card-body card-body-collapse">' +
                        '<div class="container-fluid">' +
                        '<div class="row" >' +
                        '<div class="col-lg-6 ">' +
                        json_data_extract(json.Recommendations[i]) +
                        '</div>' +
                        '<div id ="graph-container-' + i + '" class="graph col-lg-6 ">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    if (i < 3) {
                        heading = "heading_accordion2" + i;
                        button_id = "paper_accordion2" + i;
                        target_id = "collapse_accordion2" + i;
                        $('#accordion2').append('<div class="card">'
                            + '<div class="card-header" id="' + heading + '" onclick=toggleCollapse(event)>'
                            // '">'
                            + '<button type="button"  class="btn-success w-100" data-toggle="" data-target= "' + '#' + target_id + '"' + ' aria-expanded="false" aria-controls="' + target_id + '">'
                            + '<h6 class="mb-0 text-center">' + json.Topic_recommendations[i].title
                            + '</h6>'
                            + '</button>'
                            + '</div>'
                            + '<div id="' + target_id + '"' + ' class="" aria-labelledby="' + heading + '"' + ' data-parent="#accordion2">'
                            + '<div class="card-body card-body-collapse">'
                            + json_data_extract(json.Topic_recommendations[i])
                            + '</div>'
                            + '</div>')
                        heading = "heading_accordion3" + i;
                        button_id = "paper_accordion3" + i;
                        target_id = "collapse_accordion3" + i;
                        $('#accordion3').append('<div class="card">'
                            + '<div class="card-header" id="' + heading + '" onclick=toggleCollapse(event)>'
                            + '<button type="button"  class="btn-success w-100" data-toggle="" data-target= "' + '#' + target_id + '"' + ' aria-expanded="false" aria-controls="' + target_id + '">'
                            + '<h6 class="mb-0 text-center">' + json.Dept_recommendations[i].title
                            + '</h6>'
                            + '</button>'
                            + '</div>'
                            + '<div id="' + target_id + '"' + ' class="" aria-labelledby="' + heading + '"' + ' data-parent="#accordion3">'
                            + '<div class="card-body card-body-collapse">'
                            + json_data_extract(json.Dept_recommendations[i])
                            + '</div>'
                            + '</div>');
                        heading = "heading_accordion4" + i;
                        button_id = "paper_accordion4" + i;
                        target_id = "collapse_accordion4" + i;
                        $('#accordion4').append('<div class="card">'
                            + '<div class="card-header" id="' + heading + '" onclick=toggleCollapse(event)>'
                            + '<button type="button"  class="btn-success w-100" data-toggle="" data-target= "' + '#' + target_id + '"' + ' aria-expanded="false" aria-controls="' + target_id + '">'
                            + '<h6 class="mb-0 text-center">' + json.Misc_recommendations[i].title
                            + '</h6>'
                            + '</button>'
                            + '</div>'
                            + '<div id="' + target_id + '"' + ' class="" aria-labelledby="' + heading + '"' + ' data-parent="#accordion4">'
                            + '<div class="card-body card-body-collapse">'
                            + json_data_extract(json.Misc_recommendations[i])
                            + '</div>'
                            + '</div>')

                    }
                    create_graph(nodes, node_labels, i)

                }
            }
            catch (err) {

                alert("ID not found. Please Enter the correct ID ");
                window.location.href = "index.html";

            }
            // drawGraph(file)
        });
}
function json_data_extract(json) {
    var result = '<ul class="list-group" style="max-height:350px" >';
    if (json["language"] != "") {
        result = result + '<li class="list-group-item">' + '<b>' + 'Language : ' + '</b>' + json["language"] + '</li>';
    }
    if (json["type"] != "") {
        result = result + '<li class="list-group-item">' + '<b>' + 'Type : ' + '</b>' + json["type"] + '</li>';
    }
    if (json["submissionYear"] != "") {
        result = result + '<li class="list-group-item">' + '<b>' + 'Submission year : ' + '</b>' + json["submissionYear"] + '</li>';
    }
    if (json["abstract"] != "") {
        result = result + '<li class="list-group-item h-100 overflow-auto">' + '<b>' + 'Abstract : ' + '</b>' + json["abstract"] + '</li>'
    }
    result = result + '</ul>';
    return result;
}
