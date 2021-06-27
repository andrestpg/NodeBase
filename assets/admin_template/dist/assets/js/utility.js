const loader = $('#loader').html();
const noData = $('#noData').html();
const errData = $('#errData').html();
let minDate, maxDate;

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

$('a#reload').on('click', function() {
    if(myTable){
        myTable.clear().destroy();
    }
    getData();
});

$('#searchDropdown').on('shown.bs.dropdown' , () => {
    $('#searchMobile').focus();
});

$('#searchDesktop, #searchMobile').on('keypress', (e) => {
    e.keyCode == 13 && e.preventDefault();
});

const showData = async (data) => {
    // $.fn.dataTable.moment('llll');
    globalThis.myTable = $('#datatable').DataTable({
        data: await data,
        retrieve: true,
        deferRender: true,
        columns: columns
    });

    $('#searchDesktop, #searchMobile').on( 'keyup', function () {
        myTable.search(this.value ).draw();
    });
};

const getDate = (date) => {
    let dateParsing = moment(date).format('LL');
    return dateParsing;
}

const targetContent = () => {
    return new Promise( async (res, rej) => {
        await $('#targetContent').html(`
            <div class="table-responsive mb-0 py-3 px-1" data-pattern="priority-columns">
                <table class="table table-striped table-centered" id="datatable">
                </table>
            </div>
        `);
        setTimeout(() => {
            res("success");
        },500);
    });

}

const delConfirm = (name, id) => {
    Swal.fire({
        title: "Hapus Data",
        text: "Apakah anda yakin ingin menghapus data ini?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-dark ml-2 mt-2",
        buttonsStyling: !1
    }).then((res) => {
        res.value ? (
            delData(name, id),
            myTable.row($(`button[data-id="${id}"]`).parents('tr')).remove().draw(),
            Swal.fire({
                title: "Berhasil!",
                text: "Data berhasil dihapus.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonClass: "btn btn-primary mt-2 px-4"
            })
        ) : res.dismiss === Swal.DismissReason.cancel && Swal.fire({
            title: "Batal!",
            text: "Aksi telah dibatalkan",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonClass: "btn btn-primary mt-2 px-4"
        })
    })
}

const delData = (name, id) => {
    let url = `${baseUrl+name}/delete/${id}`;
    $.get(url);
}

$('#editModal').on('show.bs.modal', (e) => {
    let id =  $(e.relatedTarget).data('id')
    $('#editId').val(id);
    $('#userEditForm .form-group #nameEdit, #userEditForm .form-group #usernameEdit').attr('placeholder', "memuat...");

    clearUserForm();
    hideAlert();
    enableSubmitBtn();
});

$('#editModal').on('shown.bs.modal', (e) => {
    let btn = $(e.relatedTarget);
    let id = btn.data('id');
    let name = btn.data("name");
    let username = btn.data("username");

    $('#userEditForm').attr('data-id', id);
    $('#userEditForm .form-group #nameEdit').val(name);
    $('#userEditForm .form-group #usernameEdit').val(username);
    $('#userEditForm .form-group #nameEdit, #userEditForm .form-group #usernameEdit').attr('placeholder', "");
});

$('#modelId').on('show.bs.modal', function(e){
    clearUserForm();
    hideAlert();
    enableSubmitBtn();
});

const clearUserForm = () => {
    $('.form-control').removeClass('is-invalid').val('');
}

const showAlert = (msg) => {
    $('.alert').removeClass('hide');
    $('.err-message strong').html(msg);
}

const hideAlert = () => {
    $('.alert').addClass('hide');
}

const enableSubmitBtn = () => {
    $('button[type="submit"]').prop('disabled', false);
}

const disableBtn = (btn) => {
    btn.prop('disabled', true);
    showLoadingBtn(btn);
    changeTextBtn(btn, "Mengirim");
}

const enableBtn = (btn) => {
    btn.prop('disabled', false);
    hideLoadingBtn(btn);
    changeTextBtn(btn, "Submit");
}

const showLoadingBtn = (btn) => {
    let loaderWrapper = btn.children('.loader-wrapper');
    loaderWrapper.removeClass('hide');
}

const hideLoadingBtn = (btn) => {
    let loaderWrapper = btn.children('.loader-wrapper');
    loaderWrapper.addClass('hide');
}

const changeTextBtn = (btn, string) => {
    let loaderText = btn.children('span');
    loaderText.html(string);

}