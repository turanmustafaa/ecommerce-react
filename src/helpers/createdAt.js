export default function whenCreatedAt(isoDateString) {
    const date = new Date(isoDateString);
    const milliseconds = date.getTime();
    return milliseconds;
}