
module.exports = {
    lazyLoading: function () {
        progressively.init({
            delay: 10,
            throttle: 300,
            smBreakpoint: 600           
        });
        progressively.render();
    }
};
