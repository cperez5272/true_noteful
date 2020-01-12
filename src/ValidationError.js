import React from 'react'

class ValidationError extends React.Component {
    render() {
        return (
            <div>
                <div className="error">{this.props.message}</div>
            </div>
        )
    }
}

export default ValidationError