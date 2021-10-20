<template lang="">
<footer id="footer">
    <div class="footer">
        <p class="p1">DesignBy <b>InterestCircleClub</b> </p>
        <p class="p2"> 备20191205号 </p>
    </div>
</footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style lang="css">
    #footer{
        margin-top: 50px;
        /* width: 100vw; */
        height: 7vh;
        background-color: #2e3144;
        bottom: 0;
        z-index: 5;
        color: #b8c1ec;
        opacity: 0.89;
    }
    #footer .footer{
        margin: 0 auto;
        padding-top: 15px;
    }
    #footer .p1{
        text-align: center;
        font-size: 18px;
    }
    #footer .p2{
        text-align: center;
        font-size: 12px;
    } 
</style>