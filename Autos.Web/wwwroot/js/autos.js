const apiBase = window.autosApiBase;
const anioMaximo = new Date().getFullYear() + 1;

// =====================
// UTILIDADES
// =====================

function abrirModal(modalId) {
    $('#' + modalId).addClass('is-active');
}

function cerrarModal(modalId) {
    $('#' + modalId).removeClass('is-active');
}

// Devuelve un mensaje de error legible desde la respuesta de la API
function getErrorMessage(xhr, defaultMsg) {
    if (xhr?.responseText) return xhr.responseText;
    if (xhr?.responseJSON) {
        try { return JSON.stringify(xhr.responseJSON); } catch { }
    }
    return defaultMsg || 'Ocurrió un error.';
}

// =====================
// CREATE
// =====================

function limpiarFormCreate() {
    $('#createMarca, #createModelo, #createAnio, #createTipoDeAuto, #createCantidadDeAsientos, #createColor, #createTipoCombustible').val('');
    $('#createTieneAireAcondicionado').prop('checked', false);
    $('.help.is-danger').text('');
    $('#createErrorGeneral').hide();
}

function validarFormCreate() {
    let valido = true;

    if (!$('#createMarca').val().trim()) { $('#errorCreateMarca').text('La marca es obligatoria.'); valido = false; }
    else $('#errorCreateMarca').text('');

    if (!$('#createModelo').val().trim()) { $('#errorCreateModelo').text('El modelo es obligatorio.'); valido = false; }
    else $('#errorCreateModelo').text('');

    const anio = parseInt($('#createAnio').val());
    if (!anio || anio < 1885 || anio > anioMaximo) {
        $('#errorCreateAnio').text(`El año debe estar entre 1885 y ${anioMaximo}.`);
        valido = false;
    } else $('#errorCreateAnio').text('');

    if (!$('#createTipoDeAuto').val().trim()) { $('#errorCreateTipoDeAuto').text('El tipo de auto es obligatorio.'); valido = false; }
    else $('#errorCreateTipoDeAuto').text('');

    const asientos = parseInt($('#createCantidadDeAsientos').val());
    if (!asientos || asientos < 1 || asientos > 8) {
        $('#errorCreateCantidadDeAsientos').text('Los asientos deben estar entre 1 y 8.');
        valido = false;
    } else $('#errorCreateCantidadDeAsientos').text('');

    if (!$('#createColor').val().trim()) { $('#errorCreateColor').text('El color es obligatorio.'); valido = false; }
    else $('#errorCreateColor').text('');

    if (!$('#createTipoCombustible').val()) { $('#errorCreateTipoCombustible').text('Selecciona un tipo de combustible.'); valido = false; }
    else $('#errorCreateTipoCombustible').text('');

    return valido;
}

// Abrir modal Crear
$(document).on('click', '#btnNuevoAuto', function () {
    limpiarFormCreate();
    abrirModal('createModal');
});

// Cerrar modal Crear
$(document).on('click', '#btnCloseCreateModal, #btnCancelCreate, #createModal .modal-background', function (e) {
    e.preventDefault();
    cerrarModal('createModal');
});

// Guardar nuevo auto
$(document).on('click', '#btnGuardarCreate', function (e) {
    e.preventDefault();
    if (!validarFormCreate()) return;

    const nuevoAuto = {
        marca: $('#createMarca').val().trim(),
        modelo: $('#createModelo').val().trim(),
        anio: parseInt($('#createAnio').val()),
        tipoDeAuto: $('#createTipoDeAuto').val().trim(),
        cantidadDeAsientos: parseInt($('#createCantidadDeAsientos').val()),
        color: $('#createColor').val().trim(),
        tieneAireAcondicionado: $('#createTieneAireAcondicionado').is(':checked'),
        tipoCombustible: $('#createTipoCombustible').val()
    };

    $.ajax({
        url: apiBase,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(nuevoAuto),
        success: function () {
            cerrarModal('createModal');
            location.reload();
        },
        error: function (xhr) {
            const msg = getErrorMessage(xhr, 'Error al guardar el registro.');
            $('#createErrorGeneralMsg').text(msg);
            $('#createErrorGeneral').show();
        }
    });
});

// =====================
// EDIT
// =====================

function limpiarErroresEdit() {
    $('.help.is-danger').text('');
    $('#editErrorGeneral').hide();
}

function validarFormEdit() {
    let valido = true;

    if (!$('#editMarca').val().trim()) { $('#errorEditMarca').text('La marca es obligatoria.'); valido = false; }
    if (!$('#editModelo').val().trim()) { $('#errorEditModelo').text('El modelo es obligatorio.'); valido = false; }

    const anio = parseInt($('#editAnio').val());
    if (!anio || anio < 1885 || anio > anioMaximo) {
        $('#errorEditAnio').text(`El año debe estar entre 1885 y ${anioMaximo}.`);
        valido = false;
    }

    if (!$('#editTipoDeAuto').val().trim()) { $('#errorEditTipoDeAuto').text('El tipo de auto es obligatorio.'); valido = false; }

    const asientos = parseInt($('#editCantidadDeAsientos').val());
    if (!asientos || asientos < 1 || asientos > 8) {
        $('#errorEditCantidadDeAsientos').text('Los asientos deben estar entre 1 y 8.');
        valido = false;
    }

    if (!$('#editColor').val().trim()) { $('#errorEditColor').text('El color es obligatorio.'); valido = false; }
    if (!$('#editTipoCombustible').val()) { $('#errorEditTipoCombustible').text('Selecciona un tipo de combustible.'); valido = false; }

    return valido;
}

// Abrir modal Editar
$(document).on('click', '.btnEditar', function (e) {
    e.preventDefault();
    limpiarErroresEdit();

    const id = $(this).data('id');
    $('#editAnio').attr('max', anioMaximo);

    $.ajax({
        url: `${apiBase}/${id}`,
        type: 'GET',
        success: function (auto) {
            $('#editId').val(auto.id);
            $('#editMarca').val(auto.marca);
            $('#editModelo').val(auto.modelo);
            $('#editAnio').val(auto.anio);
            $('#editTipoDeAuto').val(auto.tipoDeAuto);
            $('#editCantidadDeAsientos').val(auto.cantidadDeAsientos);
            $('#editColor').val(auto.color);
            $('#editTieneAireAcondicionado').prop('checked', auto.tieneAireAcondicionado);
            $('#editTipoCombustible').val(auto.tipoCombustible);

            abrirModal('editModal');
        },
        error: function (xhr) {
            alert(getErrorMessage(xhr, 'No se pudo cargar el auto para edición.'));
        }
    });
});

// Cerrar modal Editar
$(document).on('click', '#btnCloseEditModal, #btnCancelEdit, #editModal .modal-background', function (e) {
    e.preventDefault();
    cerrarModal('editModal');
});

// Guardar cambios (Editar)
$(document).on('click', '#btnGuardarEdit', function (e) {
    e.preventDefault();
    limpiarErroresEdit();
    if (!validarFormEdit()) return;

    const id = parseInt($('#editId').val());

    const autoEditado = {
        id: id,
        marca: $('#editMarca').val().trim(),
        modelo: $('#editModelo').val().trim(),
        anio: parseInt($('#editAnio').val()),
        tipoDeAuto: $('#editTipoDeAuto').val().trim(),
        cantidadDeAsientos: parseInt($('#editCantidadDeAsientos').val()),
        color: $('#editColor').val().trim(),
        tieneAireAcondicionado: $('#editTieneAireAcondicionado').is(':checked'),
        tipoCombustible: $('#editTipoCombustible').val()
    };

    $.ajax({
        url: `${apiBase}/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(autoEditado),
        success: function () {
            cerrarModal('editModal');
            location.reload();
        },
        error: function (xhr) {
            const msg = getErrorMessage(xhr, 'Error al actualizar el registro.');
            $('#editErrorGeneralMsg').text(msg);
            $('#editErrorGeneral').show();
        }
    });
});

// =====================
// DELETE
// =====================

function limpiarErroresDelete() {
    $('#deleteErrorGeneral').hide();
    $('#deleteErrorGeneralMsg').text('');
}

function setDeleteAutoInfo(auto) {
    const texto = `${auto.marca} ${auto.modelo} (${auto.anio})`;
    $('#deleteAutoInfo').text(texto);
}

// Abrir modal Eliminar
$(document).on('click', '.btnEliminar', function (e) {
    e.preventDefault();
    limpiarErroresDelete();

    const id = $(this).data('id');
    $('#deleteId').val(id);

    $.ajax({
        url: `${apiBase}/${id}`,
        type: 'GET',
        success: function (auto) {
            setDeleteAutoInfo(auto);
            abrirModal('deleteModal');
        },
        error: function () {
            abrirModal('deleteModal');
        }
    });
});

// Cerrar modal Eliminar
$(document).on('click', '#btnCloseDeleteModal, #btnCancelDelete, #deleteModal .modal-background', function (e) {
    e.preventDefault();
    cerrarModal('deleteModal');
});

// Confirmar eliminación
$(document).on('click', '#btnConfirmDelete', function (e) {
    e.preventDefault();
    limpiarErroresDelete();

    const id = parseInt($('#deleteId').val());

    $.ajax({
        url: `${apiBase}/${id}`,
        type: 'DELETE',
        success: function () {
            cerrarModal('deleteModal');
            location.reload();
        },
        error: function (xhr) {
            const msg = getErrorMessage(xhr, 'Error al eliminar el registro.');
            $('#deleteErrorGeneralMsg').text(msg);
            $('#deleteErrorGeneral').show();
        }
    });
});