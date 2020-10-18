import React from 'react'


export default class Dashboard extends React.Component {
    render() {
        return (
            <p>hellso {this.props.homeUsername || 'Chưa có'}</p>
        )
    }
}