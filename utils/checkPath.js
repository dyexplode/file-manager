import path from 'path';
export default function (dir, current) {
    if (path.isAbsolute(dir)) {
        return dir;
    } else {
        return path.join(current, dir);
    }
}