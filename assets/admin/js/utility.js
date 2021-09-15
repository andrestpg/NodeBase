const loader = $('#loader').html();
const noData = $('#noData').html();
const errData = $('#errData').html();
let minDate, maxDate;

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

$('#reload').on('click', function() {
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
        columns: columns,
		language: {
			paginate: {
			  next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
			  previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>' 
			}
		}
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
                <table class="table table-striped table-centered" style="border-radius: .3rem; box-shadow: 0 2px 5px #f2f2f2;" id="datatable">
                </table>
            </div>
        `);
        setTimeout(() => {
            res("success");
        },500);
    });

}

const delConfirm = (name, id) => {
    Swal.queue([
        {
            title: "Hapus Data",
            text: "Apakah anda yakin ingin menghapus data ini?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#51A6F5",
            cancelButtonColor: "#505d69",
            allowOutsideClick: false,
            closeOnClickOutside: false,
            showLoaderOnConfirm: !0,
            preConfirm: () => {
                    return new Promise((e) =>  {
                        setTimeout(() => {
                            $.get(`/${name}/delete/${id}`).done((res) => {
                                if(res.status == 1){
                                    $('#detailModal').modal('hide');
                                    Swal.fire({
                                        title: "Berhasil",
                                        text: "Data berhasil dihapus!",
                                        icon: "success",
                                        confirmButtonText: "OK",
                                        confirmButtonColor: "#51A6F5",
                                    }).then(() => {
                                        myTable.row($(`button[data-id="${id}"]`).parents('tr')).remove().draw()
                                    })
                                }
                            });
                        }, 500);
                    });
                },
            },
      ])
}

$('#editModal').on('show.bs.modal', (e) => {
    let id =  $(e.relatedTarget).data('id')
    $('#editId').val(id);

    clearModalForm();
    hideAlert();
    enableSubmitBtn();
});

$('#editModal').on('shown.bs.modal', (e) => {
    let btn = $(e.relatedTarget);
    fillEditForm(btn);
});

$('#addModal').on('show.bs.modal', function(e){
    clearModalForm();
    hideAlert();
    enableSubmitBtn();
});

const clearModalForm = () => {
    $('.modal .form-control').removeClass('is-invalid').val('');
}

const showAlert = (modalId, msg) => {
    $(`${modalId} .modal-body .alert`).removeClass('hide');
    $(`${modalId} .modal-body .err-message strong`).html(msg);
}

const hideAlert = () => {
    $('.alert').addClass('hide');
}

const enableSubmitBtn = () => {
    let btn = $('button[type="submit"]');
    enableBtn(btn);
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

if(typeof($('.selectize')) !== "undefined"){
    globalThis.select = $('.selectize').selectize();
}