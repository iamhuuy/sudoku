'use strict';
window.onload = function () {
    var idCell = '';

    document.getElementById('pause').disabled = true;
    document.getElementById('clear').disabled = true;
    document.getElementById('reload').disabled = true;

    document.getElementById('generate').addEventListener('click', function () {
        idCell = '';
        for (var i = 0; i < 81; i++) {
            document.getElementById('cell-' + i).disabled = false;
        }
        generate();
        document.getElementById('hint').disabled = false;
        document.getElementById('solve').disabled = false;
        document.getElementById('pause').disabled = true;
        document.getElementById('reload').disabled = false;
        document.getElementById('clear').disabled = false;

    }, false);

    document.getElementById('download').addEventListener('click', function () {
        download();
    }, false);

    var sudoku = '';
    var element = [];

    document.getElementById('pause').addEventListener('click', function () {
        var statusClock = timePause();
        var allCell = document.querySelectorAll('.board-game td input');

        if (statusClock == 'stopped') {
            clearColor('duplicated-child');
            clearColor('duplicated-row');
            clearColor('duplicated-col');

            sudoku = getCurrentSudoku().toString().replace(/,/g, '');
            element = storeDisabledElement();

            allCell.forEach(function (cell) {
                if (!cell.disabled) {
                    cell.disabled = true;
                }

                cell.classList.add('disabled-cell');
                cell.value = '';
            })
        } else if (sudoku == '' && (element == undefined || element.length <= 0)) {
            //
        } else {
            var i = 0;

            allCell.forEach(function (cell) {
                cell.classList.remove('disabled-cell');

                if (sudoku[i] != 0) {
                    cell.value = sudoku[i];
                } else {
                    cell.value = '';
                }

                i++;
            });

            for (var i = 0; i < element[1].length; i++) {
                document.getElementById('cell-' + element[1][i]).disabled = false;
            }
        }
    }, false);

    document.getElementById('solve').addEventListener('click', function () {
        fillAllSudoku();
        $('pause').click(function(){return false});
        document.getElementById('intro').innerHTML = "Why don't you solve the game by yourself. Let's play again";
    }, false);

    document.getElementById('reload').addEventListener('click', function () {
        reload();
    }, false);

    document.getElementById('clear').addEventListener('click', function () {
        clear();
        document.getElementById('hint').disabled = false;
        document.getElementById('solve').disabled = false;
        document.getElementById('pause').disabled = false;
        document.getElementById('reload').disabled = false;
        document.getElementById('reload').disabled = true;
    }, false);

    document.getElementById('hint').addEventListener('click', function () {
        hint(idCell);
    }, false);

    document.getElementById('check').addEventListener('click', function () {
        check();
    });

    for (var i = 0; i < 81; i++) {
        document.getElementById('cell-' + i).addEventListener('click', function () {
            idCell = this.id;
            changeColor(idCell);
        });

        document.getElementById('cell-' + i).addEventListener('change', function () {
            debugger;
            var current = getCurrentSudoku();
            var time = document.getElementById('stop-watch').textContent;

            clearColor('duplicated-child');
            clearColor('duplicated-row');
            clearColor('duplicated-col');

            // check();
            if (isSolved(current) && isValidMatrix(current)) {
                timePause();

                if (getCountCheck() > 0) {
                    document.getElementById('intro').innerHTML = "Congratulation! You finish it in " + time + " and "
                        + getCountCheck() + " times use 'Check'";
                } else {
                    document.getElementById('intro').innerHTML = "Congratulation! You finish it in " + time;
                }

                for (var i = 0; i < 81; i++) {
                    document.getElementById('cell-' + i).disabled = true;
                }
            }
        });

        setInputFilter(document.getElementById('cell-' + i), function (value) {
            return /^\d*$/.test(value) && (value == '' || (parseInt(value) <= 9 && parseInt(value) >= 1));
        });

        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        })
    }
}
