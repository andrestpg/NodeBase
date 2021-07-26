const columns = [
    {title: "#"},
    {title: "Nama"},
    {title: "Kode Pos"},
    {title: "Operasi"},
];

const getData = () => {
    $('#targetContent').html(loader);
    const url = `/kecamatan/get`;
    let dataset = [];
    $.get(url).done((res) => {
        $.each(res, (i, dt) => {
            i += 1;
            data = [i, `<p class="font-weight-bold text-primary m-0">${dt.nama}</p>`, dt.kodePos,  generateOpr(dt.id, dt.nama, dt.nickname, dt.kodePos)];
            dataset.push(data);
        });
    }).fail(() => {
        $('#targetContent').html('<p class="text-center">Gagal Memuat Data</p>');
    }).then(() => {
        targetContent().then((mess) => {mess == "success" && showData(dataset)});
    });
}

const generateOpr = (id, name, nickname, kodePos) => {
    return `<div class="btn-group" role="group">
                    <button type="button" data-id="${id}" class="edit-btn btn btn-light btn-sm" data-toggle="modal" data-target="#editModal" data-id="${id}" data-name="${name}", data-nickname="${nickname}" data-kode="${kodePos}">
                        <i class="h5 mdi mdi-pencil text-success"></i>
                    </button>
                    <button type="button" onclick="delConfirm('kecamatan','${id}')" data-id="${id}" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Delete">
                        <i class="h5 mdi mdi-trash-can text-danger"></i>
                    </button>
                </div>`;
}

const insertData = (btn, id) => {
    hideAlert();

    let url = `/kecamatan/add`, modal = "#addModal", optName = '';
    id != "" && (url = `/kecamatan/edit/${id}`, modal = "#editModal", optName = 'Edit');

    let name = $(`#name${optName}`).val(),
        nickname = $(`#nickname${optName}`).val(),
        kodePos = $(`#kodePos${optName}`).val();
    $.post(url, {
        name: name,
        nickname: nickname,
        kodePos: kodePos,
    }).done((res) => {
        if(res.status == 1) {
            
            changeTextBtn(btn, "Data Terkirim");
            hideLoadingBtn(btn);

            setTimeout(() => {
                $(modal).modal('toggle');
                changeTextBtn(btn, "Submit");
                enableBtn(btn);
                id == "" ? appendData(res.resId, name, nickname, kodePos) : getData();
            },1000);
        }else{

            showAlert(res.desc),
            btn.prop('disabled', false)

        }
    }).fail((res) => {
        showAlert(modal, res.responseJSON.msg);
        hideLoadingBtn(btn);
        setTimeout(() => {
            changeTextBtn(btn, "Submit");
            enableBtn(btn);
        },1000)
    });
};

const appendData = (id, name, nickname, kodePos) => {
    myTable.row.add([ 
        myTable.rows().count()+1,
        `<p class="font-weight-bold text-primary m-0">${name}</p>`, 
        kodePos,  
        generateOpr(id, name, nickname, kodePos)
    ]).draw().node();
}

const fillEditForm = (btn) => {
    let id = btn.data('id');
    let name = btn.data("name");
    let nickname = btn.data("nickname");
    let kodePos = btn.data("kode");

    $('#editForm').attr('data-id', id);
    $('#editForm .form-group #nameEdit').val(name);
    $('#editForm .form-group #nicknameEdit').val(nickname);
    $('#editForm .form-group #kodePosEdit').val(kodePos);
}
