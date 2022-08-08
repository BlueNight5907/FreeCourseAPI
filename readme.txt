Tên project: TDT Learning - API
Mô tả: Backend của TDT Learning System.
Người thực hiện:
    1. Nguyễn Văn Huy - 51800783
    2. Hà Nguyễn Hải Đăng - 51800019

Yêu cầu:

        npm >= 6.5
        node >= 12

    * Kiểm tra phiên bản npm và node:

        npm --version
        node --version

Hướng dẫn cài đặt và sử dụng:
    1. Cài đặt node và npm
    Chọn phiên bản node phù hợp tại https://nodejs.org/en/download/ và cài
    đặt vào máy.
    Để kiểm tra node và npm đã cài đặt hay chưa, sử dụng các lệnh:

        npm --version
        node --version
    
    2. Cài đặt yarn 
    Kiểm tra xem yarn đã cài đặt hay chưa:
        
        yarn --version

    Cài đặt yarn thông qua npm:
        
        npm install --global yarn
    
    3. Cài đặt các package trong project
    Với npm

        npm install --force

    Với yarn

        yarn install

    4. Khởi chạy ứng dụng
    Với npm

        npm start

    Với yarn

        yarn start
    
    *App sẽ được chạy ở http://localhost:8080, trong trường hợp muốn chạy app
    ở product env và có backend cũng chạy môi trường product, truy cập vào .env để thay đổi PORT cũng như các config dành cho database

Cấu hình Mongo cloud:
    Tham khảo https://www.mongodb.com/basics/clusters/mongodb-cluster-setup


Tài khoản được sử dụng trong hệ thống:
    1. Admin
    email: admin@tdt-learning.com
    password: admin123

    2. Teacher
    email: test@gmail.com
    password: 1234567

    3. Student
    email: test1@gmail.com
    password: 1234567

    


