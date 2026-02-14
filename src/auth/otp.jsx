import React from 'react';
import '../assets/styles/otp.css';

const OTPEmail = ({ otp = "123456" }) => {
    return (
        <div className="email-wrapper">
            <div className="email-container">
                <div className="email-header">
                    <h1>OTP Verification</h1>
                </div>

                <div className="email-body">
                    <p>Hello,</p>
                    <p>
                        We received a request to verify your account.
                        Please use the following one-time password (OTP)
                        to complete your process:
                    </p>

                    <div className="otp-code">{otp}</div>

                    <p>
                        The OTP is valid for 10 minutes. If you did not
                        request this, please ignore this message.
                    </p>
                </div>

                <div className="email-footer">
                    <p>
                        If you have any questions, feel free to{" "}
                        <a href="mailto:support@example.com">contact support</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPEmail;
