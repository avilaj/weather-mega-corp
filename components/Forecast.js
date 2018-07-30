export default ({
    list
}) => (
    <div>
        {
            list.map(weather => (
                <div>
                    { weather.description }
                    { weather.temperature }
                    <br />
                    <br />
                </div>
            ))
        }
    </div>
);