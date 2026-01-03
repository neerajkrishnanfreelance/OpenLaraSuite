<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $note->title }}</title>
    
    <style>
        /* 1. Reset standard browser margins so slides touch edges */
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #000; /* Optional: Black background for slides */
        }

        /* 2. Create a container that acts as the "Page" */
        .slide-container {
            width: 100vw;   /* 100% of viewport width */
            height: 100vh;  /* 100% of viewport height */
            position: relative;
            display: flex;             /* CSS Flexbox for centering */
            justify-content: center;   /* Center Horizontally */
            align-items: center;       /* Center Vertically */
            overflow: hidden;          /* Hide scrollbars */
            page-break-after: always;  /* Forces a new page for print/PDF */
        }

        /* 3. Ensure the last slide doesn't create an empty page after it */
        .slide-container:last-child {
            page-break-after: avoid;
        }

        /* 4. Style the Image to fit nicely */
        .slide-container img {
            max-width: 100%;
            max-height: 100%;
            /* 'contain' ensures the whole image is visible without stretching. 
               Change to 'cover' if you want it to fill the screen fully but crop edges. */
            display: block;
        }

        /* 5. Footer Positioning */
        .slide-footer {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: white;
            background: rgba(0, 0, 0, 0.5);
            padding: 5px 10px;
            border-radius: 4px;
            font-family: sans-serif;
            font-size: 14px;
            z-index: 10;
        }

        /* Print-specific settings to remove headers/margins */
        @media print {
            @page { margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>

    @if(!empty($images))
        @foreach($images as $index => $img)
            <div class="slide-container">
                <img src="{{ $img }}" alt="Drawing {{ $index + 1 }}" />
                <div class="slide-footer">
                    Slide {{ $index + 1 }} / {{ count($images) }}
                </div>
            </div>
        @endforeach
    @endif

</body>
</html>