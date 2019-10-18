# react-demo
Create react app with product ssr and development demo

# Authentication
Reference: [https://medium.com/@jcbaey/authentication-in-spa-reactjs-and-vuejs-the-right-way-e4a9ac5cd9a3](https://medium.com/@jcbaey/authentication-in-spa-reactjs-and-vuejs-the-right-way-e4a9ac5cd9a3)

## 1. Encrypted communication (HTTPS) (Mã hóa giao tiếp)

- Khi xác thực dùng `HTTP headers` và trao đổi các dữ liệu cực kỳ nhạy cảm `password, access_token, ...`. Nếu Attacker `sniffing the network` sẽ lấy được các dữ liệu nhạy cảm này khi `communication`.

***Solutions***: `communication` phải được mã hóa.

## 2. Do not use URL query parameters to exchange sensitive data (không dùng biến trên url khi trao đổi dữ liệu nhạy cảm
)

- URL và URL query parameters có thể được lưu trong `server log, browser logs, browser history`. Ai đó có thể lấy url, url query parameters này và dùng lại.

- Ai đó có thể copy và paste URL có authentication tokens => dẫn đến chiếm quyền điều khiển phiên có và không chủ ý.

- Có thể gặp phải các giới hạn kích thước URL trên `browsers or server`.

***Solutions***: Không dùng URL query parameters đối với dữ liệu nhạy cảm và quá dài.

## 3. Prevent brute-force attacks

- Attacker có thể cố gắng đoán `password, token or username` bằng cách thử nhiều khả năng.

***Solutions***:
  - `Rate limiter` nên được thực hiện trên `backend server` của bạn để giới hạn số lần request thử lại.  
  - Chặn những user mà gặp quá nhiều lỗi máy chủ `sever error` (300+, 400+, 500).
  - Không nên lộ ra các gợi ý về công nghệ của bạn. Ex: Xóa `X-Powered-By` (loại server bạn đang dùng) trong `response header`. Nếu dùng `Express FW` thì bạn có thể dùng [Helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)

## 4. Thường xuyên update your dependencies.

- Để tránh lỗi bảo mật đã được vá, nên cập nhật các packages thường xuyên.
- Cũng nên update thường xuyên your server.

```sh
# List security breaches 
npm audit

# Upgrade of minor and patch version following your version ranges in package.json
yarn outdated
yarn update

# Interactive upgrade of minor and patch version following your version ranges in package.json 
yarn upgrade-interactive

# List outdated dependencies including major version
yarn upgrade-interactive --latest

# Same with npm
npm outdated
npm update

# Tool for upgrading to major versions (with potential breaking changes)
npm install -g npm-check-updates
ncu
```

## 5. Add monitoring

- Monitor your servers để phát hiện các bất thường trước khi xảy ra sự cố.

## 6. Authentication

- Có 2 cơ chế chính để xác định một `client` trên 1 REST API (chúng ta có thể kết hợp cả 2):
  + `Bearer Token`
  + `Authentication cookie`

### 6.1 Bearer Token

#### What is a bearer token?

- `Bearer token` là giá trị của `Authorization` header của bất kì `HTTP requests`
- Không tự động được lưu ở bất kì đâu
- Không có ngày hết hạn (expiry date)
- Không liên kết với domain.

```sh
GET https://www.example.com/api/users
Authorization: Bearer my_bearer_token_value
```

- Chúng ta dùng `JWT` cho `token format` của chúng ta.

- Cơ bản `JWT` có 3 phần:
  + Header
  + Payload (nó có thể giữ `user_id` và `role_of_user`) và 1 `expiration time`(Không bắt buộc)
  + Signature (chữ ký)

#### Basic use cases (Các trường hợp sử dụng)

- Bảo vệ các truy cập giữa `Brower (website), Application (Mobile App, Destop App)` và `Back-end` chỉ định.
- Bảo vệ truy cập giữa các `Back-end` với nhau (***M2M***) được kiểm soát (controlled) bởi các bên khác nhau (`OpenId Connect` là 1 ví dụ), hoặc trong các dịch vụ Back-end services của 1 bên (of one party).

#### Where to store JWT?

- Chúng ta phải lưu thủ công `JWT` trong `clients` (memory, local/session cookie, local storage, ...) 
- Recommended: Không nên lưu `JWT` ở `Browser local storage`:
  + Nó vẫn còn nếu user đóng `browser`, bởi vậy session có thể được khôi phục cho đến khi `JWT` expires.
  + Bất kỳ `JS code` trên trang của bạn cũng có thể truy cập `local storage`: Nó không có bảo vệ dữ liệu nào.
  + Nó không thể được dùng bởi `web workers`.

- Lưu `JWT` trong session cookie có thể là một giải pháp, chúng ta sẽ nói vấn đề này sau.
- Reference: [https://auth0.com/docs/security/store-tokens](https://auth0.com/docs/security/store-tokens)

#### Basic attacks

- `Cross-Site-Script (XSS)`: attacker có thể `may compromise a web site JS dependencies ` hoặc thêm mã độc javascript thông qua input form để ăn cắp `JWT` của nạn nhân. Attacker sẽ dùng nó để giả mạo nạn nhân.

- ***Resolution***:
  + Giảm khả năng bị tấn công bằng cách `Escaping` và kiểm soát nội dung do người dùng tạo. Nhưng rất khó giảm thiểu bởi 1 `public CDN`.

### 6.2 Authentication cookie


#### Basic use cases

#### Where to store cookies?

#### Basic attacks

### 6.3 Can we combine both?

