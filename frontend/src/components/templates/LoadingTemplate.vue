<template>
    <div class="loading">
        <div class="loaderRGB">
            <span style="--i:1;"></span>
            <span style="--i:2;"></span>
            <span style="--i:3;"></span>
            <span style="--i:4;"></span>
            <span style="--i:5;"></span>
            <span style="--i:6;"></span>
            <span style="--i:7;"></span>
            <span style="--i:8;"></span>
            <span style="--i:9;"></span>
            <span style="--i:10;"></span>
            <span style="--i:11;"></span>
            <span style="--i:12;"></span>
            <span style="--i:13;"></span>
            <span style="--i:14;"></span>
            <span style="--i:15;"></span>
            <span style="--i:16;"></span>
            <span style="--i:17;"></span>
            <span style="--i:18;"></span>
            <span style="--i:19;"></span>
            <span style="--i:20;"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingTemplate'
}
</script>

<style>
    .loading {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: animateBg 10s linear infinite;
        background: linear-gradient(153deg, rgba(2,0,36,1) 0%, rgb(25, 0, 29) 100%);
    }

    @keyframes animateBg {
        0%{
            filter: hue-rotate(0deg)
        }
        100%{
            filter: hue-rotate(360deg);
        }
    }

    .loading .loaderRGB {
        position: relative;
        width: 120px;
        height: 120px;
    }

    .loading .loaderRGB span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(calc(18deg * var(--i)));
    }

    .loading .loaderRGB span::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(44, 1, 201);
        box-shadow: 0 0 10px rgb(44, 1, 201),
                    0 0 20px  rgb(44, 1, 201),
                    0 0 40px  rgb(44, 1, 201),
                    0 0 60px  rgb(44, 1, 201),
                    0 0 80px  rgb(44, 1, 201),
                    0 0 100px rgb(44, 1, 201);
        animation: animateL 2s linear infinite;
        animation-delay: calc(0.1s * var(--i));
    }

    @keyframes animateL {
        0%{
            transform: scale(1);
        }
        80%, 100%{
            transform: scale(0);
        }
    }
</style>