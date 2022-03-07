<script>
    export let Switch = { label: switchLabel, value: switchValue };
</script>

<style>
    /* The switch - the box around the slider */
    .Switch {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 16px;
        margin-right: 10px;
        text-indent: 40px;
        line-height: 16px;
    }
    
    /* Hide default HTML checkbox */
    .Switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 1px;
        bottom: 1px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    
    input:checked + .slider {
        background-color: #95629d;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #95629d;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(14px);
        -ms-transform: translateX(14px);
        transform: translateX(14px);
    }
    
    /* Rounded sliders */
    .slider.round {
        border-radius: 14px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>

<label class="Switch">
    <input type="checkbox" bind:checked={Switch.value} />
    <span class="slider round" />
</label>
