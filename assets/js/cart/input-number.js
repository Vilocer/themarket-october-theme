jQuery(($) => {
    // input type number 
    // Уменьшаем на 1 
    $(document).on('click', '.input-number__minus', function () {
        let total = $(this).next()
            max = total.data('max')
            min = total.data('min');
        
        total.val(+total.val() - 1);

        if (total.val() > parseInt(max, 10)) {
            total.val(max);
        }

        if (total.val() < parseInt(min, 10)) {
            total.val(min);
        }


        changeCartPositionQuantity(total.val(), this);

    });
    // Увеличиваем на 1 
    $(document).on('click', '.input-number__plus', function () {
        let total = $(this).prev()
            max = total.data('max')
            min = total.data('min');

        total.val(+total.val() + 1);

        if (parseInt(total.val(), 10) > parseInt(max, 10)) {
            total.val(max);
        }

        if (parseInt(total.val(), 10) < parseInt(min, 10)) {
            total.val(min);
        }

        changeCartPositionQuantity(total.val(), this);
    });

    $(document).on('input', '.input-number__input', function(el) {
        this.value = this.value.replace(/[^\d]/g, '');

        let max = $(this).data('max')
            min = $(this).data('min');

        if (parseInt(this.value, 10) > parseInt(max, 10)) {
            this.value = max;
        }

        if (parseInt(this.value, 10) < parseInt(min, 10)) {
            this.value = min;
        }

        changeCartPositionQuantity(this.value, this);
    });
});