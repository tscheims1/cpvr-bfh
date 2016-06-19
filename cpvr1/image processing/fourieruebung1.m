
X = imread('/home/tscheims/Documents/Images/Lena512.png'); %Load image into matrix X
I = im2single(X);                   %Convert to single floats [0-1]
imshow(I); title('Original');       %Show image
pause;

h = [1,1,1;
     1,-8,1;
     1,1,1];
tic;
I2 = conv2(I,h);

toc
imshow(I2); title('laplace');
pause;

I_fft = fft2(I);
h_fft = fft2(h,size(I,1),size(I,2));

tic;
I2_fft = I_fft .* h_fft;

I3 = ifft2(I2_fft);
toc
imshow(I3); title('laplace fft2');
pause;
%ränder sind unterschiedlich

%1:lena 128
%Elapsed time is 0.000401 seconds.
%Elapsed time is 0.000988 seconds.

%3 lena 512
%Elapsed time is 0.005343 seconds.
%Elapsed time is 0.050283 seconds.

%Elapsed time is 0.004088 seconds.
%Elapsed time is 0.011997 seconds.
