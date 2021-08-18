import { useEffect, useRef, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    & > div {
        border: 1px solid #292F49;
        border-radius: 8px;
        padding: 8px;
        display: inline-flex;
        justify-content: center;
    }

    @media only screen and (max-width: 576px) {
        text-align: center;
    }
`;

const Item = styled.div`
    background: #1A1E30;
    border-radius: 8px;
    padding: 10px 16px;
    margin-right: 8px;
    width: 100px;

    &:last-child {
        margin-right: 0;
    }

    & > p:first-child {
        font-family: EvilEmpire;
        font-size: 64px;
    }

    & > p:last-child {
        font-size: 18px;
        color: #9298AB;
    }

    @media only screen and (max-width: 768px) {
        /* width: calc(100%/4 - 5px); */
        width: 75px;
        & > p:first-child {
            font-size: 30px;
        }

        & > p:last-child {
            font-size: 12px;
        }
    }
`;

export default function Countdown(props) {

    const { deadline, onEnd } = props

    const [countdown, setcountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const interval = useRef(null)

    useEffect(() => {
        if (interval.current) clearInterval(interval.current)

        interval.current = setInterval(() => {
            let now = new Date().getTime();
            let distance = deadline - now;

            if (distance <= 0) {
                if (interval.current) clearInterval(interval.current)
                if (onEnd) onEnd()
                return
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var countdown = {
                days,
                hours,
                minutes,
                seconds
            }
            setcountdown(countdown)
        }, 1000)
        return () => {
            clearInterval(interval.current)
        };
    }, [deadline, onEnd]);

    return (
        <Wrapper>
            <div>
                {countdown.days > 0 && <Item>
                    <p>{countdown.days}</p>
                    <p>days</p>
                </Item>}
                {countdown.hours > 0 && <Item>
                    <p>{countdown.hours}</p>
                    <p>hours</p>
                </Item>}
                {countdown.minutes > 0 && <Item>
                    <p>{countdown.minutes}</p>
                    <p>minutes</p>
                </Item>}
                <Item>
                    <p>{countdown.seconds}</p>
                    <p>seconds</p>
                </Item>
            </div>
        </Wrapper>
    )
}