RCLONE_REMOTE="r2"
BUCKET_NAME="jimchen4214-blog"
STATIC_HOST="https://cdn.jimchen.me"

for file in *; do
    if [ -f "$file" ]; then
        uuid=$(uuidgen)
        extension="${file##*.}"
        new_name="${uuid}.${extension}"
        rclone copy "$file" "${RCLONE_REMOTE}:${BUCKET_NAME}/${new_name}" -P
        echo "${STATIC_HOST}/${new_name}"
    fi
done
