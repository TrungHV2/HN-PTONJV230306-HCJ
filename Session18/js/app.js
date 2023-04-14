// Định nghĩa lớp Nhiệm vụ
class Task {
    constructor(id = 0, name = '', status = false) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}

// Khai báo khởi tại mảng nhiệm vụ
var tasks = JSON.parse(localStorage.getItem('tasks')) || [
    new Task(1, 'Buy flowers for girlfriend', true),
    new Task(2, 'Buy move tickets', false),
    new Task(3, 'Book a table at the restaurant', false),
];

// Định nghĩa hàm hiển thị nhiệm vụ
function loadTasks() {
    let rows = '';
    for (let t of tasks) {
        rows += `<tr data-id="${t.id}">
                    <td>${t.id}</td>
                    <td>${t.name}</td>
                    <td>
                        <select class="taskStatus" name="" id="">
                            <option value="false" ${t.status? '' : 'selected'}>In progress</option>
                            <option value="true" ${t.status? 'selected' : ''}>Done</option>
                        </select>
                    </td>
                    <td>
                        <button class="btnEdit">Edit</button>
                        <button class="btnDel">Delete</button>
                    </td>
                </tr>`;
    }
    $('.list').html(rows);
}
// Xử lý sự kiện update trạng thái
$(document).on('change', '.taskStatus', function() {
    // Lấy tr hiện tại
    let tr = $(this).parents('tr');
    // Tìm id task cần update
    let id = $(tr).data('id');
    // Lấy trạng thái update
    let stt = $(this).val();
    // Tìm task theo id và update
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = stt == 'true' ? true : false;
            break;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
})
$(document).on('click', '.btnEdit', function() {
    let tr = $(this).parents('tr');
    let id = $(tr).data('id');
    // Tìm task cần sửa
    let _task = tasks.find(t => t.id == id);
    // Đẩy thông tin lên form
    $('.taskId').val(_task.id);
    $('.taskName').val(_task.name);
})
$(document).on('click', '.btnDel', function() {
    if (confirm('Bạn có muốn xóa task không?')) {
        let tr = $(this).parents('tr');
        let id = $(tr).data('id');
        // Tìm task cần xóa
        let _taskIndex = tasks.findIndex(t => t.id == id);
        // Xóa
        tasks.splice(_taskIndex, 1);
        // Lưu lại local sau khi xóa
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
})
$('.btnSave').click(function() {
    if ($('.taskId').val() != '') {// sửa
        // Lấy id đối tượng cần sửa
        let id = parseInt($('.taskId').val());
        // Tìm và update
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks[i].name = $('.taskName').val();
                break;
            }
        }
    } else { // thêm mới
        // Tạo đối tượng mới
        let newTask = new Task();
        newTask.id = tasks.length + 1;
        newTask.name = $('.taskName').val();
        // thêm vào mảng
        tasks.push(newTask);
    }
    $('.taskId').val('');
    $('.taskName').val('');
    // Lưu lại local sau khi update
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
})
loadTasks();
