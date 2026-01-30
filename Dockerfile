# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["FutureStepsAcademy.API.csproj", "./"]
RUN dotnet restore "FutureStepsAcademy.API.csproj"

# Copy the remaining source code and build the application
COPY . .
WORKDIR "/src/."
RUN dotnet build "FutureStepsAcademy.API.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "FutureStepsAcademy.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the official ASP.NET Core runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FutureStepsAcademy.API.dll"]
