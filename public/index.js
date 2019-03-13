
let url = 'http://localhost:3000/web/hello_word'
function add(params) {

    console.log('哈哈哈哈哈哈')
    let value = $('#add').val();
    $.ajax({
        type: 'post',
        data: {
            add : value
        },
        url : url,
        success: res => {
            $('#content').val(res)
        }
    })
}


function deletes(params) {
    let value = window.document.querySelector('#delete').value();
    $.ajax({
        type: 'delete',
        data: {
            delete: value
        },
        success: res => {
            $('#content').val(res)
        }
    })
}

function replace(params) {
    let value = $('#replace').val();
    $.ajax({
        url : url,
        type: 'put',
        data: {
            replace: value,
        },
        success: res => {
            $('#content').val(res)
        }
    })
}


function query(params) {
    let value = $('#query').val();
    $.ajax({
        type: 'get',
        url : url,
        data: {
            query: value
        },
        success: res => {
            $('#content').val(res)
        }
    })
}