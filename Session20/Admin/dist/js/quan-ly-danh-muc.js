// Khai báo biến chứa danh sách danh mục
var categories = JSON.parse(localStorage.getItem('categories')) || [
    {
        id: 1,
        name: 'Hoa quả nhập',
        // parentId: 3,
        status: true
    },
    {
        id: 2,
        name: 'Hoa quả nội',
        // parentId: 3,
        status: false
    },
    {
        id: 3,
        name: 'Hoa quả',
        // parentId: 0,
        status: false
    }
];

/**
 * Hàm hiển thị danh sách danh mục lên table
 */
function loadCategories() {
    let rows = '';
    for (let c of categories) {
        rows += `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editCategory(event, ${c.id})">Sửa</button> 
                        <button class="btn btn-danger"  onclick="delCategory(event, ${c.id})">Xóa</button>
                    </td>
                </tr>`
    }
    $('.tbl_categories').html(rows);
}
function editCategory(evt, id) {
    let cat = categories.find(c => c.id == id);
    if (cat) {
        $('#catId').val(cat.id);
        $('#catId').attr('readonly', true);
        $('#catName').val(cat.name);
        $('#catStatus').attr('checked', cat.status);
    }
}
function delCategory(evt, id) {
    if (confirm('Bạn có muốn xóa không?')) {
        let index = categories.findIndex(c => c.id == id);
        if (index >= 0) {
            categories.splice(index, 1);
            // Load lại danh sách
            loadCategories();
            // Lưu lại localStorage
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }
}
function save() {
    console.log($('#catId').prop('readonly'));
    let id = $('#catId').val();
    if (id) {
        let cat = categories.find(c => c.id == id);
        if (cat) { // update
            cat.name = $('#catName').val();
            cat.status = $('#catStatus').is(':checked');
        } else { //create
            categories.push({
                id: $('#catId').val(),
                name: $('#catName').val(),
                status: $('#catStatus').is(':checked')
            })
        }
        // Load lại danh sách
        loadCategories();
        // Lưu lại localStorage
        localStorage.setItem('categories', JSON.stringify(categories));
        // Làm mới form
        $('#catId').val('');
        $('#catId').attr('readonly', false);
        $('#catName').val('');
        $('#catStatus').attr('checked', false);
    }
}
loadCategories();